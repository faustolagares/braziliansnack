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
  const [hasFood, setHasFood] = useState<boolean>(true); // true = terá comida na festa
  const [selectedProducts, setSelectedProducts] = useState<Map<string, SelectedProduct>>(new Map());
  const headerRef = useRef<HTMLDivElement>(null);
  const { isVisible: isHeaderVisible, elementRef: headerElementRef } = useScrollReveal({ delay: 200 });

  React.useEffect(() => {
    if (headerRef.current) {
      (headerElementRef as React.MutableRefObject<HTMLElement | null>).current = headerRef.current;
    }
  }, [headerElementRef]);

  // Calcular quantidades recomendadas baseado em ter comida ou não
  const recommendedSavory = useMemo(() => {
    if (hasFood) {
      return Math.ceil(people * 5); // 5 salgados por pessoa quando tem comida
    } else {
      return Math.ceil(people * 12); // 12 salgados por pessoa quando não tem comida
    }
  }, [people, hasFood]);

  const recommendedSweet = useMemo(() => {
    if (hasFood) {
      return Math.ceil(people * 3); // 3 doces por pessoa quando tem comida
    } else {
      return Math.ceil(people * 4.5); // 4-5 doces por pessoa quando não tem comida (média 4.5)
    }
  }, [people, hasFood]);

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
      // Quantidade inicial 0 - usuário vai inserir
      const initialQuantity = 0;
      // Usar o menor pacote disponível como padrão
      const defaultPackage = product.pricingTiers && product.pricingTiers.length > 0 
        ? product.pricingTiers[0] // Menor pacote
        : null;
      
      newSelected.set(productId, {
        product,
        quantity: initialQuantity,
        packageTier: defaultPackage
      });
    }

    setSelectedProducts(newSelected);
  };

  // Atualizar quantidade de um produto
  const updateQuantity = (productId: string, quantity: number) => {
    const newSelected = new Map(selectedProducts);
    const selected = newSelected.get(productId);
    
    if (selected) {
      let bestPackage = selected.packageTier;
      
      // Se quantidade > 0, calcular melhor pacote. Se 0, manter pacote padrão
      if (quantity > 0) {
        bestPackage = findBestPackage(selected.product, quantity);
      } else {
        // Se quantidade é 0, usar o menor pacote disponível
        bestPackage = selected.product.pricingTiers && selected.product.pricingTiers.length > 0
          ? selected.product.pricingTiers[0]
          : null;
      }
      
      newSelected.set(productId, {
        ...selected,
        quantity: Math.max(0, quantity), // Permitir 0
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
    const savoryItems: string[] = [];
    const sweetItems: string[] = [];

    selectedProducts.forEach((selected) => {
      // Só incluir produtos com quantidade > 0
      if (selected.quantity === 0 || !selected.packageTier) return;
      
      const packagesNeeded = Math.ceil(selected.quantity / selected.packageTier.quantity);
      const itemPrice = packagesNeeded * selected.packageTier.price;
      
      const line = `${selected.product.name[lang]}: ${selected.quantity} unidades (${packagesNeeded}x ${selected.packageTier.quantity}un) - $${itemPrice.toFixed(2)}`;
      
      if (selected.product.category === 'savory') {
        savoryItems.push(line);
      } else {
        sweetItems.push(line);
      }
    });

    // Construir mensagem organizada
    let message = '';
    
    if (lang === 'pt') {
      message = `Olá! Gostaria de fazer um pedido:\n\n`;
      message += `📋 PEDIDO PARA FESTA\n`;
      message += `👥 Número de pessoas: ${people}\n\n`;
      
      if (savoryItems.length > 0) {
        message += `🍴 SALGADOS:\n`;
        savoryItems.forEach(item => message += `${item}\n`);
        message += `\n`;
      }
      
      if (sweetItems.length > 0) {
        message += `🍰 DOCES:\n`;
        sweetItems.forEach(item => message += `${item}\n`);
        message += `\n`;
      }
      
      message += `💰 TOTAL: $${total.toFixed(2)}\n\n`;
      message += `[Produtos podem ser congelados ou prontos]`;
    } else if (lang === 'en') {
      message = `Hello! I would like to place an order:\n\n`;
      message += `📋 PARTY ORDER\n`;
      message += `👥 Number of people: ${people}\n\n`;
      
      if (savoryItems.length > 0) {
        message += `🍴 SAVORY SNACKS:\n`;
        savoryItems.forEach(item => message += `${item}\n`);
        message += `\n`;
      }
      
      if (sweetItems.length > 0) {
        message += `🍰 SWEETS:\n`;
        sweetItems.forEach(item => message += `${item}\n`);
        message += `\n`;
      }
      
      message += `💰 TOTAL: $${total.toFixed(2)}\n\n`;
      message += `[Products can be frozen or ready]`;
    } else {
      message = `¡Hola! Me gustaría hacer un pedido:\n\n`;
      message += `📋 PEDIDO PARA FIESTA\n`;
      message += `👥 Número de personas: ${people}\n\n`;
      
      if (savoryItems.length > 0) {
        message += `🍴 SALADOS:\n`;
        savoryItems.forEach(item => message += `${item}\n`);
        message += `\n`;
      }
      
      if (sweetItems.length > 0) {
        message += `🍰 DULCES:\n`;
        sweetItems.forEach(item => message += `${item}\n`);
        message += `\n`;
      }
      
      message += `💰 TOTAL: $${total.toFixed(2)}\n\n`;
      message += `[Productos pueden ser congelados o listos]`;
    }

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
    setHasFood(true); // Reset para true (terá comida)
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
              <div className="flex flex-col gap-6">
                {/* Input de Pessoas */}
                <div className="flex flex-col md:flex-row gap-3">
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
                      className="w-32 px-4 py-3 border-2 border-brand-onyx font-bold text-2xl text-brand-onyx bg-brand-porcelain focus:outline-none focus:ring-2 focus:ring-brand-sea"
                    />
                  </div>
                  
                  {/* Recomendações ao lado - alinhadas ao centro do input */}
                  <div className="flex gap-8 md:gap-12 items-center">
                    <div className="text-center">
                      <div className="text-5xl md:text-6xl font-display font-black text-brand-sea mb-2">
                        {recommendedSavory}
                      </div>
                      <div className="text-sm font-bold uppercase text-brand-onyx/70">
                        {t.recommendedSavory.split(' ')[0]}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl md:text-6xl font-display font-black text-brand-sea mb-2">
                        {recommendedSweet}
                      </div>
                      <div className="text-sm font-bold uppercase text-brand-onyx/70">
                        {t.recommendedSweet.split(' ')[0]}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Toggle: Terá comida na festa? */}
                <div className="pt-4 border-t-2 border-brand-onyx">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={hasFood}
                        onChange={(e) => setHasFood(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-14 h-8 border-2 border-brand-onyx transition-all duration-200 ${
                        hasFood ? 'bg-brand-sea' : 'bg-brand-porcelain'
                      }`}>
                        <div className={`w-6 h-6 bg-brand-onyx border-2 border-brand-onyx transition-transform duration-200 mt-0.5 ${
                          hasFood ? 'translate-x-6' : 'translate-x-0.5'
                        }`}></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <span className="font-bold text-sm uppercase text-brand-onyx">
                        {lang === 'pt' ? 'Terá comida na festa?' : lang === 'en' ? 'Will there be food at the party?' : '¿Habrá comida en la fiesta?'}
                      </span>
                      <p className="text-xs text-brand-onyx/70 mt-1">
                        {lang === 'pt' 
                          ? hasFood 
                            ? 'Recomendação: 5 salgados e 3 doces por pessoa' 
                            : 'Recomendação: 12 salgados e 4-5 doces por pessoa'
                          : lang === 'en'
                          ? hasFood
                            ? 'Recommendation: 5 savory and 3 sweets per person'
                            : 'Recommendation: 12 savory and 4-5 sweets per person'
                          : hasFood
                          ? 'Recomendación: 5 salados y 3 dulces por persona'
                          : 'Recomendación: 12 salados y 4-5 dulces por persona'
                        }
                      </p>
                    </div>
                  </label>
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
                {t.recommendedSavory}
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
                        <h4 className="font-display font-bold text-xs uppercase text-brand-onyx leading-tight mb-2">
                          {product.name[lang]}
                        </h4>
                        {isSelected && (
                          <div className="mt-2 pt-2 border-t border-brand-onyx/20">
                            <label className="block text-[10px] font-bold text-brand-onyx uppercase mb-1">
                              {t.quantity}
                            </label>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const current = selectedProducts.get(product.id);
                                  if (current) {
                                    updateQuantity(product.id, Math.max(1, current.quantity - 1));
                                  }
                                }}
                                className="w-6 h-6 border border-brand-onyx flex items-center justify-center hover:bg-brand-onyx hover:text-brand-yellow transition-colors"
                              >
                                <Minus size={10} strokeWidth={3} />
                              </button>
                              <input
                                type="number"
                                min="0"
                                value={selectedProducts.get(product.id)?.quantity ?? 0}
                                onChange={(e) => {
                                  const qty = Math.max(0, parseInt(e.target.value) || 0);
                                  updateQuantity(product.id, qty);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-12 px-1 py-1 border border-brand-onyx font-bold text-xs text-brand-onyx text-center bg-brand-porcelain focus:outline-none"
                              />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const current = selectedProducts.get(product.id);
                                  if (current) {
                                    updateQuantity(product.id, current.quantity + 1);
                                  }
                                }}
                                className="w-6 h-6 border border-brand-onyx flex items-center justify-center hover:bg-brand-onyx hover:text-brand-yellow transition-colors"
                              >
                                <Plus size={10} strokeWidth={3} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Doces */}
            <div>
              <h3 className="text-3xl font-display font-black text-brand-onyx uppercase mb-6">
                {t.recommendedSweet}
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
                        <h4 className="font-display font-bold text-xs uppercase text-brand-onyx leading-tight mb-2">
                          {product.name[lang]}
                        </h4>
                        {isSelected && (
                          <div className="mt-2 pt-2 border-t border-brand-onyx/20">
                            <label className="block text-[10px] font-bold text-brand-onyx uppercase mb-1">
                              {t.quantity}
                            </label>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const current = selectedProducts.get(product.id);
                                  if (current) {
                                    updateQuantity(product.id, Math.max(1, current.quantity - 1));
                                  }
                                }}
                                className="w-6 h-6 border border-brand-onyx flex items-center justify-center hover:bg-brand-onyx hover:text-brand-yellow transition-colors"
                              >
                                <Minus size={10} strokeWidth={3} />
                              </button>
                              <input
                                type="number"
                                min="0"
                                value={selectedProducts.get(product.id)?.quantity ?? 0}
                                onChange={(e) => {
                                  const qty = Math.max(0, parseInt(e.target.value) || 0);
                                  updateQuantity(product.id, qty);
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-12 px-1 py-1 border border-brand-onyx font-bold text-xs text-brand-onyx text-center bg-brand-porcelain focus:outline-none"
                              />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const current = selectedProducts.get(product.id);
                                  if (current) {
                                    updateQuantity(product.id, current.quantity + 1);
                                  }
                                }}
                                className="w-6 h-6 border border-brand-onyx flex items-center justify-center hover:bg-brand-onyx hover:text-brand-yellow transition-colors"
                              >
                                <Plus size={10} strokeWidth={3} />
                              </button>
                            </div>
                          </div>
                        )}
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
                  {Array.from(selectedProducts.values())
                    .filter(selected => selected.quantity > 0)
                    .map((selected) => (
                    <div key={selected.product.id} className="border-2 border-brand-onyx p-4 bg-brand-porcelain">
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-display font-bold text-sm uppercase text-brand-onyx leading-tight mb-1">
                            {selected.product.name[lang]}
                          </h4>
                          <div className="flex items-center gap-2 text-sm font-bold">
                            <span className="text-brand-sea">{selected.quantity}x</span>
                            {selected.packageTier && (
                              <>
                                <span className="text-brand-onyx/40">•</span>
                                <span className="text-brand-sea">${(Math.ceil(selected.quantity / selected.packageTier.quantity) * selected.packageTier.price).toFixed(2)}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <button 
                          onClick={() => toggleProduct(selected.product)}
                          className="text-brand-onyx hover:text-brand-sea transition-colors ml-3 flex-shrink-0"
                        >
                          <X size={18} strokeWidth={3} />
                        </button>
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
