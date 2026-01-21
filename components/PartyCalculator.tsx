import React, { useState, useMemo, useRef } from 'react';
import { Translation, Product, Language } from '../types';
import { PRODUCTS, WHATSAPP_NUMBER } from '../constants';
import { Calculator, Users, ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Props {
  t: Translation['calculator'];
  lang: Language;
}

interface SelectedProduct {
  product: Product;
  quantity: number;
  packageTier: { quantity: number; price: number } | null;
}

export const PartyCalculator: React.FC<Props> = ({ t, lang }) => {
  const [people, setPeople] = useState<number>(20);
  const [selectedProducts, setSelectedProducts] = useState<Map<string, SelectedProduct>>(new Map());
  const headerRef = useRef<HTMLDivElement>(null);
  const { isVisible: isHeaderVisible, elementRef: headerElementRef } = useScrollReveal({ delay: 200 });

  React.useEffect(() => {
    if (headerRef.current) {
      (headerElementRef as React.MutableRefObject<HTMLElement | null>).current = headerRef.current;
    }
  }, [headerElementRef]);

  // Calcular quantidades recomendadas
  const recommendedSavory = Math.ceil(people * 4); // 4 salgados por pessoa
  const recommendedSweet = Math.ceil(people * 2.5); // 2.5 doces por pessoa

  // Separar produtos
  const savoryProducts = PRODUCTS.filter(p => p.category === 'savory');
  const sweetProducts = PRODUCTS.filter(p => p.category === 'sweet');

  // Função para encontrar o melhor pacote para uma quantidade
  const findBestPackage = (product: Product, quantity: number) => {
    if (!product.pricingTiers || product.pricingTiers.length === 0) {
      return null;
    }

    // Ordenar tiers por quantidade (maior primeiro)
    const sortedTiers = [...product.pricingTiers].sort((a, b) => b.quantity - a.quantity);
    
    // Encontrar o tier que cobre a quantidade ou o menor que seja maior
    for (const tier of sortedTiers) {
      if (quantity <= tier.quantity) {
        return tier;
      }
    }
    
    // Se a quantidade é maior que todos os tiers, usar o maior tier
    return sortedTiers[0];
  };

  // Toggle seleção de produto
  const toggleProduct = (product: Product) => {
    const newSelected = new Map(selectedProducts);
    const productId = product.id;

    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      const recommendedQty = product.category === 'savory' ? recommendedSavory : recommendedSweet;
      const bestPackage = findBestPackage(product, recommendedQty);
      
      newSelected.set(productId, {
        product,
        quantity: recommendedQty,
        packageTier: bestPackage
      });
    }

    setSelectedProducts(newSelected);
  };

  // Atualizar quantidade de um produto
  const updateQuantity = (productId: string, quantity: number) => {
    const newSelected = new Map(selectedProducts);
    const selected = newSelected.get(productId);
    
    if (selected && quantity > 0) {
      const bestPackage = findBestPackage(selected.product, quantity);
      newSelected.set(productId, {
        ...selected,
        quantity,
        packageTier: bestPackage
      });
      setSelectedProducts(newSelected);
    }
  };

  // Atualizar pacote de um produto (mantém a quantidade, apenas atualiza o tier)
  const updatePackage = (productId: string, tier: { quantity: number; price: number }) => {
    const newSelected = new Map(selectedProducts);
    const selected = newSelected.get(productId);
    
    if (selected) {
      // Mantém a quantidade atual, apenas atualiza o tier
      newSelected.set(productId, {
        ...selected,
        packageTier: tier
      });
      setSelectedProducts(newSelected);
    }
  };

  // Calcular total
  const total = useMemo(() => {
    let sum = 0;
    selectedProducts.forEach((selected) => {
      if (selected.packageTier && selected.quantity > 0) {
        // Calcular quantos pacotes são necessários para a quantidade desejada
        const packagesNeeded = Math.ceil(selected.quantity / selected.packageTier.quantity);
        sum += packagesNeeded * selected.packageTier.price;
      }
    });
    return sum;
  }, [selectedProducts]);

  // Gerar mensagem WhatsApp
  const generateWhatsAppMessage = () => {
    const savoryList: string[] = [];
    const sweetList: string[] = [];

    selectedProducts.forEach((selected) => {
      if (!selected.packageTier) return;
      
      const packagesNeeded = Math.ceil(selected.quantity / selected.packageTier.quantity);
      const line = `- ${selected.product.name[lang]}: ${selected.quantity} unidades (${packagesNeeded}x Pacote ${selected.packageTier.quantity}un - $${selected.packageTier.price * packagesNeeded})`;
      
      if (selected.product.category === 'savory') {
        savoryList.push(line);
      } else {
        sweetList.push(line);
      }
    });

    const savoryText = savoryList.length > 0 ? savoryList.join('\n') : (lang === 'pt' ? 'Nenhum' : lang === 'en' ? 'None' : 'Ninguno');
    const sweetText = sweetList.length > 0 ? sweetList.join('\n') : (lang === 'pt' ? 'Nenhum' : lang === 'en' ? 'None' : 'Ninguno');
    
    let message = t.orderMessage
      .replace('{people}', people.toString())
      .replace('{savoryList}', savoryText)
      .replace('{sweetList}', sweetText)
      .replace('{total}', total.toFixed(2));

    return message;
  };

  const handleSendToWhatsApp = () => {
    if (selectedProducts.size === 0) {
      alert(t.noProducts);
      return;
    }

    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  const handleReset = () => {
    setSelectedProducts(new Map());
    setPeople(20);
  };

  return (
    <section className="py-24 bg-brand-yellow relative">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
         backgroundImage: 'linear-gradient(var(--onyx) 1px, transparent 1px), linear-gradient(90deg, var(--onyx) 1px, transparent 1px)',
         backgroundSize: '40px 40px'
      }}></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-12">
          <div 
            ref={headerRef}
            className={`max-w-2xl scroll-reveal-fade-up ${isHeaderVisible ? 'visible' : ''}`}
          >
            <h2 className="text-5xl md:text-7xl font-display font-black text-brand-onyx uppercase leading-none mb-4">
              {t.title}
            </h2>
            <p className="text-lg text-brand-onyx/80 font-medium mb-8">
              {t.subtitle}
            </p>

            {/* Input de Pessoas com Recomendações */}
            <div className="bg-white border-2 border-brand-onyx p-6 shadow-[4px_4px_0px_0px_#0f0f0f] max-w-3xl">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-1 w-full md:w-auto">
                  <label className="flex items-center gap-2 mb-3 font-bold text-brand-onyx uppercase text-sm">
                    <Users size={20} />
                    {t.peopleLabel}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={people}
                    onChange={(e) => setPeople(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-3 border-2 border-brand-onyx font-bold text-2xl text-brand-onyx bg-brand-porcelain focus:outline-none focus:ring-2 focus:ring-brand-sea"
                  />
                </div>
                
                {/* Recomendações ao lado */}
                <div className="flex gap-8 md:gap-12">
                  <div className="text-center">
                    <div className="text-4xl font-display font-black text-brand-sea mb-1">
                      {recommendedSavory}
                    </div>
                    <div className="text-xs font-bold uppercase text-brand-onyx/70">
                      {t.recommendedSavory.split(' ')[0]}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-display font-black text-brand-sea mb-1">
                      {recommendedSweet}
                    </div>
                    <div className="text-xs font-bold uppercase text-brand-onyx/70">
                      {t.recommendedSweet.split(' ')[0]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Principal: Produtos (esquerda) + Carrinho (direita) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LADO ESQUERDO - Produtos */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Salgados */}
            <div>
              <h3 className="text-3xl font-display font-black text-brand-onyx uppercase mb-6">
                🍴 {t.recommendedSavory}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {savoryProducts.map((product) => {
                  const isSelected = selectedProducts.has(product.id);
                  
                  return (
                    <div 
                      key={product.id}
                      onClick={() => toggleProduct(product)}
                      className={`bg-white border-2 border-brand-onyx cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'shadow-[4px_4px_0px_0px_#0f0f0f] ring-2 ring-brand-sea' 
                          : 'hover:shadow-[4px_4px_0px_0px_#0f0f0f]'
                      }`}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img 
                          src="/images/coxinha-sample.png" 
                          alt={product.name[lang]}
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute top-1 right-1 bg-brand-sea text-brand-porcelain w-6 h-6 rounded-full flex items-center justify-center font-black text-sm border-2 border-brand-onyx shadow-sm">
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="p-2 border-t-2 border-brand-onyx">
                        <h4 className="font-display font-bold text-xs uppercase text-brand-onyx leading-tight">
                          {product.name[lang]}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Doces */}
            <div>
              <h3 className="text-3xl font-display font-black text-brand-onyx uppercase mb-6">
                🍰 {t.recommendedSweet}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {sweetProducts.map((product) => {
                  const isSelected = selectedProducts.has(product.id);
                  
                  return (
                    <div 
                      key={product.id}
                      onClick={() => toggleProduct(product)}
                      className={`bg-white border-2 border-brand-onyx cursor-pointer transition-all duration-200 ${
                        isSelected 
                          ? 'shadow-[4px_4px_0px_0px_#0f0f0f] ring-2 ring-brand-sea' 
                          : 'hover:shadow-[4px_4px_0px_0px_#0f0f0f]'
                      }`}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img 
                          src="/images/coxinha-sample.png" 
                          alt={product.name[lang]}
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute top-1 right-1 bg-brand-sea text-brand-porcelain w-6 h-6 rounded-full flex items-center justify-center font-black text-sm border-2 border-brand-onyx shadow-sm">
                            ✓
                          </div>
                        )}
                      </div>
                      <div className="p-2 border-t-2 border-brand-onyx">
                        <h4 className="font-display font-bold text-xs uppercase text-brand-onyx leading-tight">
                          {product.name[lang]}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* LADO DIREITO - Carrinho/Resumo (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-brand-onyx p-6 shadow-[4px_4px_0px_0px_#0f0f0f] sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingCart className="text-brand-onyx" size={24} />
                <h3 className="text-2xl font-display font-black text-brand-onyx uppercase">
                  Seu Pedido
                </h3>
              </div>
              
              {selectedProducts.size === 0 ? (
                <div className="text-center py-12">
                  <p className="text-sm text-brand-onyx/50 font-medium">
                    {lang === 'pt' ? 'Nenhum produto selecionado' : lang === 'en' ? 'No products selected' : 'Ningún producto seleccionado'}
                  </p>
                  <p className="text-xs text-brand-onyx/40 mt-2">
                    {lang === 'pt' ? 'Clique nos produtos para adicionar' : lang === 'en' ? 'Click on products to add' : 'Haz clic en los productos para agregar'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  {Array.from(selectedProducts.values()).map((selected) => (
                    <div key={selected.product.id} className="border-2 border-brand-onyx p-4 bg-brand-porcelain">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-display font-bold text-sm uppercase text-brand-onyx flex-1 leading-tight">
                          {selected.product.name[lang]}
                        </h4>
                        <button 
                          onClick={() => toggleProduct(selected.product)}
                          className="text-brand-onyx hover:text-brand-sea transition-colors ml-2"
                        >
                          <X size={18} strokeWidth={3} />
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-brand-onyx uppercase mb-1">
                            {t.quantity}
                          </label>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(selected.product.id, Math.max(1, selected.quantity - 1))}
                              className="w-8 h-8 border-2 border-brand-onyx flex items-center justify-center hover:bg-brand-onyx hover:text-brand-yellow transition-colors"
                            >
                              <Minus size={14} strokeWidth={3} />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={selected.quantity}
                              onChange={(e) => updateQuantity(selected.product.id, Math.max(1, parseInt(e.target.value) || 1))}
                              className="flex-1 px-3 py-2 border-2 border-brand-onyx font-bold text-brand-onyx text-center bg-brand-porcelain focus:outline-none"
                            />
                            <button
                              onClick={() => updateQuantity(selected.product.id, selected.quantity + 1)}
                              className="w-8 h-8 border-2 border-brand-onyx flex items-center justify-center hover:bg-brand-onyx hover:text-brand-yellow transition-colors"
                            >
                              <Plus size={14} strokeWidth={3} />
                            </button>
                          </div>
                        </div>
                        
                        {selected.product.pricingTiers && selected.product.pricingTiers.length > 0 && (
                          <div>
                            <label className="block text-xs font-bold text-brand-onyx uppercase mb-1">
                              {t.package}
                            </label>
                            <select 
                              value={selected.packageTier?.quantity || ''}
                              onChange={(e) => {
                                const tier = selected.product.pricingTiers?.find(t => t.quantity === parseInt(e.target.value));
                                if (tier) updatePackage(selected.product.id, tier);
                              }}
                              className="w-full px-3 py-2 border-2 border-brand-onyx font-bold text-sm text-brand-onyx bg-brand-porcelain focus:outline-none"
                            >
                              {selected.product.pricingTiers.map((tier) => (
                                <option key={tier.quantity} value={tier.quantity}>
                                  {tier.quantity} un - ${tier.price}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                        
                        {selected.packageTier && (
                          <div className="pt-2 border-t border-brand-onyx/20">
                            <div className="text-xs text-brand-onyx/60 mb-1">
                              {Math.ceil(selected.quantity / selected.packageTier.quantity)}x pacote{Math.ceil(selected.quantity / selected.packageTier.quantity) > 1 ? 's' : ''}
                            </div>
                            <div className="text-lg font-display font-black text-brand-sea">
                              ${(Math.ceil(selected.quantity / selected.packageTier.quantity) * selected.packageTier.price).toFixed(2)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Total e Botões */}
              <div className="pt-6 border-t-2 border-brand-onyx">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-display font-black uppercase text-brand-onyx">
                    {t.total}
                  </span>
                  <span className="text-4xl font-display font-black text-brand-sea">
                    ${total.toFixed(2)}
                  </span>
                </div>
                
                <button 
                  onClick={handleSendToWhatsApp}
                  disabled={selectedProducts.size === 0}
                  className="w-full bg-brand-onyx text-brand-yellow py-4 font-bold uppercase tracking-wider border-2 border-brand-onyx shadow-[4px_4px_0px_0px_#0f0f0f] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  {t.sendToWhatsApp}
                </button>
                
                <button 
                  onClick={handleReset}
                  className="w-full mt-3 border-2 border-brand-onyx py-3 font-bold uppercase tracking-wider text-brand-onyx hover:bg-brand-onyx hover:text-brand-yellow transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <X size={18} />
                  {t.reset}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
