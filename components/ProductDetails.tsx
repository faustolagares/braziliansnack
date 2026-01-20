
import React from 'react';
import { Product, Language, Translation } from '../types';
import { ArrowLeft, MessageCircle, Star, ShieldCheck, Clock, ThermometerSnowflake, Flame, ChefHat, Info, Package } from 'lucide-react';

interface Props {
  product: Product;
  lang: Language;
  t: Translation;
  onBack: () => void;
  onOrderClick: () => void;
}

export const ProductDetails: React.FC<Props> = ({ product, lang, t, onBack, onOrderClick }) => {
  const details = product.details;
  const hasPreparation = details?.preparation !== undefined;

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-brand-porcelain min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Breadcrumb / Back Navigation */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 font-bold uppercase tracking-wide text-sm mb-8 hover:text-brand-sea transition-colors"
        >
          <div className="bg-white border-2 border-brand-onyx p-2 transition-all group-hover:-translate-x-1">
            <ArrowLeft size={20} />
          </div>
          <span>{t.nav.menu} / {product.name[lang]}</span>
        </button>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          
          {/* Left Column: Image */}
          <div className="relative">
             <div className="relative bg-white border-2 border-brand-onyx aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name[lang]} 
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Tags */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isPopular && (
                        <span className="bg-brand-yellow text-brand-onyx px-4 py-2 font-black uppercase text-xs border-2 border-brand-onyx shadow-sm">
                            Best Seller
                        </span>
                    )}
                    <span className="bg-brand-porcelain text-brand-onyx px-4 py-2 font-bold uppercase text-xs border-2 border-brand-onyx shadow-sm">
                        {product.category === 'savory' ? t.menu.savoryTab : t.menu.sweetTab}
                    </span>
                </div>
             </div>

             {/* Frozen Available Badge - Only if preparation exists (implies savory/cookable) */}
             {hasPreparation && (
                 <div className="mt-4 bg-brand-sea/10 border-2 border-brand-sea p-4 flex items-center gap-3">
                     <ThermometerSnowflake className="text-brand-sea" size={24} />
                     <div>
                        <h4 className="font-bold text-brand-sea uppercase text-sm leading-none mb-1">
                            Também Vendemos Congelado!
                        </h4>
                        <p className="text-xs font-medium opacity-80">
                            Leve para casa e prepare quando quiser.
                        </p>
                     </div>
                 </div>
             )}
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col h-full">
            
            <div className="mb-2 flex items-center gap-2">
                <div className="flex text-brand-yellow">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" strokeWidth={2} className="text-brand-onyx" />)}
                </div>
                <span className="text-sm font-bold opacity-60">(124 Reviews)</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-black text-brand-onyx uppercase leading-[0.9] mb-6">
              {product.name[lang]}
            </h1>

            <div className="flex items-end gap-4 mb-8 pb-8 border-b-2 border-dashed border-brand-onyx/20">
               <span className="font-mono font-bold text-6xl text-brand-sea tracking-tighter leading-none">
                 ${product.price}
               </span>
               <span className="text-brand-onyx/50 font-bold uppercase text-sm mb-2">
                 / {t.menu.unit}
               </span>
            </div>

            <p className="text-lg md:text-xl text-brand-onyx/80 font-medium leading-relaxed mb-8">
              {product.description[lang]}
            </p>

            {/* Pricing Tiers Table */}
            {product.pricingTiers && (
                <div className="mb-8">
                    <h4 className="font-bold text-sm uppercase mb-3 text-brand-onyx flex items-center gap-2">
                        <Package size={16} /> Pacotes Disponíveis
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {product.pricingTiers.map((tier, idx) => (
                            <div key={idx} className="bg-white border-2 border-brand-onyx p-2 text-center hover:bg-brand-porcelain transition-colors">
                                <div className="text-xs font-bold text-brand-onyx/50 uppercase mb-1">{tier.quantity} un</div>
                                <div className="font-mono font-bold text-xl text-brand-sea">${tier.price}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-white border-2 border-brand-onyx p-4 flex items-start gap-3">
                    <Clock className="text-brand-sea shrink-0" />
                    <div>
                        <h4 className="font-bold text-xs uppercase mb-1">Tempo de Preparo</h4>
                        <p className="text-xs leading-tight">Feito na hora, entrega agendada.</p>
                    </div>
                </div>
                <div className="bg-white border-2 border-brand-onyx p-4 flex items-start gap-3">
                    <ShieldCheck className="text-brand-sea shrink-0" />
                    <div>
                        <h4 className="font-bold text-xs uppercase mb-1">Qualidade</h4>
                        <p className="text-xs leading-tight">Ingredientes frescos e selecionados.</p>
                    </div>
                </div>
            </div>

            {/* CTA Actions */}
            <div className="mt-auto">
               <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={onOrderClick}
                    className="flex-1 bg-brand-yellow text-brand-onyx text-xl font-bold px-8 py-5 uppercase tracking-wider border-2 border-brand-onyx shadow-[6px_6px_0px_0px_rgba(15,15,15,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-200 flex items-center justify-center gap-3"
                  >
                    <MessageCircle size={24} strokeWidth={2.5} />
                    {t.nav.orderBtn}
                  </button>
               </div>
               <p className="text-center text-xs font-bold text-brand-onyx/40 uppercase mt-4">
                 Pedidos processados via WhatsApp
               </p>
            </div>
          </div>
        </div>

        {/* Detailed Info Section (Only if details exist) */}
        {details && (
            <div className="border-t-4 border-brand-onyx pt-16">
                <h3 className="text-4xl font-display font-black text-brand-onyx uppercase mb-12 flex items-center gap-3">
                    <Info size={36} strokeWidth={2.5} />
                    Detalhes do Produto
                </h3>

                {/* Grid Layout for Details */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* Ingredients & Preparation Column */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                         {/* Conditionally Render Preparation */}
                         {details.preparation && (
                             <div className="bg-white border-2 border-brand-onyx p-8">
                                <h4 className="text-2xl font-display font-bold uppercase mb-6 flex items-center gap-2">
                                    <Flame className="text-brand-yellow fill-brand-onyx" />
                                    Modo de Preparo (Congelado)
                                </h4>
                                <div className="space-y-6">
                                    {details.preparation.steps.map((step, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-brand-onyx text-brand-porcelain font-display font-bold text-xl flex items-center justify-center border-2 border-brand-onyx shadow-[4px_4px_0px_0px_#FFC72C]">
                                                {idx + 1}
                                            </div>
                                            <p className="text-lg font-medium pt-2">{step[lang]}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 bg-brand-mustard/20 border-2 border-brand-mustard p-4 text-sm font-bold flex gap-2">
                                    <span className="text-brand-onyx">★</span>
                                    {details.preparation.tips[lang]}
                                </div>
                             </div>
                         )}

                         <div className="bg-brand-porcelain border-2 border-brand-onyx p-8">
                            <h4 className="text-xl font-display font-bold uppercase mb-4 flex items-center gap-2">
                                <ChefHat size={20} />
                                Ingredientes
                            </h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-medium">
                                {details.ingredients[lang].map((ing, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-brand-onyx rounded-full"></div>
                                        {ing}
                                    </li>
                                ))}
                            </ul>
                         </div>
                    </div>

                    {/* Nutrition Column (Brutalist Table Style - Updated) */}
                    <div className="lg:col-span-5">
                        <div className="bg-white border-2 border-brand-onyx p-6">
                            <h4 className="text-3xl font-display font-black uppercase mb-1 border-b-2 border-brand-onyx pb-2">
                                Tabela Nutricional
                            </h4>
                            <p className="text-sm font-bold mb-4">
                                Porção: {details.nutrition.servingSize[lang]}
                            </p>
                            
                            <div className="space-y-0">
                                <div className="flex justify-between py-2 border-b-2 border-brand-onyx font-black text-2xl">
                                    <span>Calorias</span>
                                    <span>{details.nutrition.calories}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-brand-onyx font-bold">
                                    <span>Proteína</span>
                                    <span className="font-mono">{details.nutrition.protein}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-brand-onyx font-bold">
                                    <span>Carboidratos</span>
                                    <span className="font-mono">{details.nutrition.carbs}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b-2 border-brand-onyx font-bold">
                                    <span>Gorduras Totais</span>
                                    <span className="font-mono">{details.nutrition.fats}</span>
                                </div>
                                <p className="text-[10px] mt-4 leading-tight opacity-60">
                                    *Valores diários de referência com base em uma dieta de 2.000 calorias. Seus valores diários podem ser maiores ou menores dependendo de suas necessidades energéticas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};
