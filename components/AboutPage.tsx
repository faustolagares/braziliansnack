
import React, { useRef, useState, useEffect } from 'react';
import { Translation, Language } from '../types';
import { Heart, Target, Lightbulb, ChefHat, Package, Shield, Sparkles, AlertCircle, Calculator, Award, Star, Globe, Users, Trash, AlertTriangle, EyeOff } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Props {
  t: Translation['about'];
  lang: Language;
  onOrderClick: () => void;
}

export const AboutPage: React.FC<Props> = ({ t, lang, onOrderClick }) => {
  // Refs para scroll reveal
  const heroRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const customerHeroRef = useRef<HTMLDivElement>(null);
  const thinkingRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const deliveryRef = useRef<HTMLDivElement>(null);
  const commitmentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const { isVisible: isHeroVisible, elementRef: heroElementRef } = useScrollReveal({ delay: 0, rootMargin: '0px 0px 50px 0px', threshold: 0.1 });
  const { isVisible: isWhyVisible, elementRef: whyElementRef } = useScrollReveal({ delay: 0, rootMargin: '0px 0px 50px 0px', threshold: 0.1 });
  const { isVisible: isCustomerHeroVisible, elementRef: customerHeroElementRef } = useScrollReveal({ delay: 0, rootMargin: '0px 0px 50px 0px', threshold: 0.1 });
  const { isVisible: isThinkingVisible, elementRef: thinkingElementRef } = useScrollReveal({ delay: 0, rootMargin: '0px 0px 50px 0px', threshold: 0.1 });
  const { isVisible: isProcessVisible, elementRef: processElementRef } = useScrollReveal({ delay: 0, rootMargin: '0px 0px 50px 0px', threshold: 0.1 });
  const { isVisible: isDeliveryVisible, elementRef: deliveryElementRef } = useScrollReveal({ delay: 0, rootMargin: '0px 0px 50px 0px', threshold: 0.1 });
  const { isVisible: isCommitmentVisible, elementRef: commitmentElementRef } = useScrollReveal({ delay: 0, rootMargin: '0px 0px 50px 0px', threshold: 0.1 });

  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (heroRef.current) {
      (heroElementRef as React.MutableRefObject<HTMLElement | null>).current = heroRef.current;
    }
    if (whyRef.current) {
      (whyElementRef as React.MutableRefObject<HTMLElement | null>).current = whyRef.current;
    }
    if (customerHeroRef.current) {
      (customerHeroElementRef as React.MutableRefObject<HTMLElement | null>).current = customerHeroRef.current;
    }
    if (thinkingRef.current) {
      (thinkingElementRef as React.MutableRefObject<HTMLElement | null>).current = thinkingRef.current;
    }
    if (processRef.current) {
      (processElementRef as React.MutableRefObject<HTMLElement | null>).current = processRef.current;
    }
    if (deliveryRef.current) {
      (deliveryElementRef as React.MutableRefObject<HTMLElement | null>).current = deliveryRef.current;
    }
    if (commitmentRef.current) {
      (commitmentElementRef as React.MutableRefObject<HTMLElement | null>).current = commitmentRef.current;
    }
  }, [heroElementRef, whyElementRef, customerHeroElementRef, thinkingElementRef, processElementRef, deliveryElementRef, commitmentElementRef]);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('[data-index]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setTimeout(() => {
              setVisibleCards((prev) => new Set([...prev, index]));
            }, index * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px 50px 0px',
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const pillars = [
    {
      icon: <ChefHat size={48} strokeWidth={2} />,
      title: t.thinking.pillars[0].title,
      desc: t.thinking.pillars[0].desc,
      bg: 'bg-white',
      text: 'text-brand-onyx'
    },
    {
      icon: <Package size={48} strokeWidth={2} />,
      title: t.thinking.pillars[1].title,
      desc: t.thinking.pillars[1].desc,
      bg: 'bg-brand-sea',
      text: 'text-brand-porcelain'
    },
    {
      icon: <Lightbulb size={48} strokeWidth={2} />,
      title: t.thinking.pillars[2].title,
      desc: t.thinking.pillars[2].desc,
      bg: 'bg-brand-blue',
      text: 'text-brand-porcelain'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-porcelain">
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-brand-dark relative">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="w-full h-full" style={{ 
            backgroundImage: 'linear-gradient(var(--porcelain) 1px, transparent 1px), linear-gradient(90deg, var(--porcelain) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div 
            ref={heroRef}
            className={`max-w-4xl mx-auto text-center scroll-reveal-fade-up ${isHeroVisible ? 'visible' : ''}`}
          >
            <h1 className="text-6xl md:text-8xl font-display font-black text-brand-yellow mb-6 uppercase leading-none">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-brand-porcelain/90 font-medium max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Nosso Porquê */}
      <section className="py-24 bg-brand-porcelain relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(var(--onyx) 1px, transparent 1px), linear-gradient(90deg, var(--onyx) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div 
            ref={whyRef}
            className={`max-w-4xl mx-auto scroll-reveal-fade-up ${isWhyVisible ? 'visible' : ''}`}
          >
            <div className="mb-12 text-center">
              <div className="flex justify-center mb-4">
                <Target className="text-brand-sea" size={48} strokeWidth={2} />
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-black text-brand-onyx uppercase leading-none">
                {t.why.title}
              </h2>
            </div>
            
            {/* Texto completo - parágrafos juntos */}
            <div className="mb-12 text-center">
              <div className="space-y-6 text-lg text-brand-onyx/80 font-medium leading-relaxed max-w-3xl mx-auto">
                {t.why.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Espaço para foto */}
            <div className="mb-12">
              <div className="w-full h-64 md:h-96 bg-brand-porcelain border-2 border-dashed border-brand-onyx/20 flex items-center justify-center">
                <p className="text-brand-onyx/40 font-medium text-sm uppercase">
                  {lang === 'pt' ? 'Espaço para foto' : lang === 'en' ? 'Photo space' : 'Espacio para foto'}
                </p>
              </div>
            </div>

            {/* Grid de 3 colunas com ícones e títulos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                { 
                  icon: <Sparkles className="text-brand-sea" size={48} strokeWidth={2} />, 
                  title: lang === 'pt' ? 'Uma Crença' : lang === 'en' ? 'A Belief' : 'Una Creencia',
                  desc: lang === 'pt' ? 'Festa boa não é sobre excesso, é sobre acertar' : lang === 'en' ? 'A good party isn\'t about excess, it\'s about getting it right' : 'Una buena fiesta no es sobre exceso, es sobre acertar'
                },
                { 
                  icon: <AlertCircle className="text-brand-sea" size={48} strokeWidth={2} />, 
                  title: lang === 'pt' ? 'Um Problema' : lang === 'en' ? 'A Problem' : 'Un Problema',
                  desc: lang === 'pt' ? 'O desperdício e estresse que queremos eliminar' : lang === 'en' ? 'The waste and stress we want to eliminate' : 'El desperdicio y estrés que queremos eliminar'
                },
                { 
                  icon: <Heart className="text-brand-sea" size={48} strokeWidth={2} />, 
                  title: lang === 'pt' ? 'Uma Missão' : lang === 'en' ? 'A Mission' : 'Una Misión',
                  desc: lang === 'pt' ? 'Transformar como as pessoas planejam festas' : lang === 'en' ? 'Transform how people plan parties' : 'Transformar cómo las personas planean fiestas'
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-brand-onyx uppercase mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-onyx/70 font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* O Cliente é o Herói */}
      <section className="py-24 bg-brand-yellow relative">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(var(--onyx) 1px, transparent 1px), linear-gradient(90deg, var(--onyx) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div 
            ref={customerHeroRef}
            className={`max-w-4xl mx-auto scroll-reveal-fade-up ${isCustomerHeroVisible ? 'visible' : ''}`}
          >
            <div className="mb-12 text-center">
              <div className="flex justify-center mb-4">
                <Users className="text-brand-onyx" size={48} strokeWidth={2} />
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-black text-brand-onyx uppercase leading-none">
                {t.customerHero.title}
              </h2>
            </div>
            
            {/* Texto completo - parágrafos juntos */}
            <div className="mb-12 text-center">
              <div className="space-y-6 text-lg text-brand-onyx/80 font-medium leading-relaxed max-w-3xl mx-auto">
                {t.customerHero.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Espaço para foto */}
            <div className="mb-12">
              <div className="w-full h-64 md:h-96 bg-brand-yellow/20 border-2 border-dashed border-brand-onyx/30 flex items-center justify-center">
                <p className="text-brand-onyx/40 font-medium text-sm uppercase">
                  {lang === 'pt' ? 'Espaço para foto' : lang === 'en' ? 'Photo space' : 'Espacio para foto'}
                </p>
              </div>
            </div>

            {/* Grid de 3 colunas com problemas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {t.customerHero.problems.map((problem, index) => {
                const iconMap: Record<string, React.ReactNode> = {
                  Trash: <Trash className="text-brand-onyx" size={48} strokeWidth={2} />,
                  AlertTriangle: <AlertTriangle className="text-brand-onyx" size={48} strokeWidth={2} />,
                  EyeOff: <EyeOff className="text-brand-onyx" size={48} strokeWidth={2} />
                };
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      {iconMap[problem.icon]}
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-brand-onyx uppercase mb-2">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-brand-onyx/70 font-medium">
                      {problem.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Como Pensamos */}
      <section className="py-24 bg-brand-yellow relative">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(var(--onyx) 1px, transparent 1px), linear-gradient(90deg, var(--onyx) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div 
            ref={thinkingRef}
            className={`mb-16 scroll-reveal-fade-up ${isThinkingVisible ? 'visible' : ''}`}
          >
            <div className="mb-4 text-center">
              <div className="flex justify-center mb-4">
                <Lightbulb className="text-brand-onyx" size={48} strokeWidth={2} />
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-black text-brand-onyx uppercase leading-none">
                {t.thinking.title}
              </h2>
            </div>
            <p className="text-xl text-brand-onyx/80 font-medium max-w-3xl text-center mx-auto">
              {t.thinking.subtitle}
            </p>
          </div>

          {/* Pillars Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                data-index={index}
                className={`${pillar.bg} border-2 border-brand-onyx p-8 shadow-[6px_6px_0px_0px_#0f0f0f] hover:translate-y-1 hover:shadow-none transition-all duration-200 scroll-reveal-fade-up ${
                  visibleCards.has(index) ? 'visible' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
              >
                <div className={`${pillar.text} mb-6`}>
                  {pillar.icon}
                </div>
                <h3 className={`text-3xl font-display font-bold mb-4 uppercase leading-tight ${pillar.text}`}>
                  {pillar.title}
                </h3>
                <p className={`text-base font-medium leading-relaxed opacity-90 ${pillar.text}`}>
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Como Fazemos */}
      <section className="py-24 bg-brand-porcelain relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(var(--onyx) 1px, transparent 1px), linear-gradient(90deg, var(--onyx) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div 
            ref={processRef}
            className={`max-w-4xl mx-auto scroll-reveal-fade-up ${isProcessVisible ? 'visible' : ''}`}
          >
            <div className="mb-12 text-center">
              <div className="flex justify-center mb-4">
                <ChefHat className="text-brand-sea" size={48} strokeWidth={2} />
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-black text-brand-onyx uppercase leading-none">
                {t.process.title}
              </h2>
            </div>
            
            <div className="space-y-8">
              {t.process.steps.map((step, index) => {
                const processIcons = [
                  <Calculator className="text-brand-onyx" size={36} strokeWidth={2} />,
                  <ChefHat className="text-brand-onyx" size={36} strokeWidth={2} />,
                  <Award className="text-brand-onyx" size={36} strokeWidth={2} />
                ];
                const processTitles = [
                  lang === 'pt' ? 'Planejamento' : lang === 'en' ? 'Planning' : 'Planificación',
                  lang === 'pt' ? 'Produção' : lang === 'en' ? 'Production' : 'Producción',
                  lang === 'pt' ? 'Qualidade' : lang === 'en' ? 'Quality' : 'Calidad'
                ];
                return (
                  <div 
                    key={index}
                    className="bg-white border-2 border-brand-onyx p-8 shadow-[6px_6px_0px_0px_#0f0f0f]"
                  >
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="bg-brand-yellow text-brand-onyx w-12 h-12 flex items-center justify-center font-display font-black text-2xl border-2 border-brand-onyx">
                          {index + 1}
                        </div>
                        <div className="text-brand-onyx">
                          {processIcons[index]}
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-brand-onyx uppercase mb-3">
                        {processTitles[index]}
                      </h3>
                      <p className="text-lg text-brand-onyx font-medium leading-relaxed">
                        {step}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* O Que Entregamos */}
      <section className="py-24 bg-brand-sea relative">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(var(--porcelain) 1px, transparent 1px), linear-gradient(90deg, var(--porcelain) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div 
            ref={deliveryRef}
            className={`max-w-4xl mx-auto scroll-reveal-fade-up ${isDeliveryVisible ? 'visible' : ''}`}
          >
            <div className="mb-12 text-center">
              <div className="flex justify-center mb-4">
                <Package className="text-brand-yellow" size={48} strokeWidth={2} />
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-black text-brand-porcelain uppercase leading-none">
                {t.delivery.title}
              </h2>
            </div>
            
            {/* Texto completo - parágrafos juntos */}
            <div className="mb-12 text-center">
              <div className="space-y-6 text-lg text-brand-porcelain/90 font-medium leading-relaxed max-w-3xl mx-auto">
                {t.delivery.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Espaço para foto */}
            <div className="mb-12">
              <div className="w-full h-64 md:h-96 bg-brand-sea/20 border-2 border-dashed border-brand-porcelain/30 flex items-center justify-center">
                <p className="text-brand-porcelain/40 font-medium text-sm uppercase">
                  {lang === 'pt' ? 'Espaço para foto' : lang === 'en' ? 'Photo space' : 'Espacio para foto'}
                </p>
              </div>
            </div>

            {/* Grid de 2 colunas com ícones e títulos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[
                { 
                  icon: <Heart className="text-brand-yellow" size={48} strokeWidth={2} />, 
                  title: lang === 'pt' ? 'Mais Que Comida' : lang === 'en' ? 'More Than Food' : 'Más Que Comida',
                  desc: lang === 'pt' ? 'Tranquilidade e confiança para sua festa' : lang === 'en' ? 'Peace of mind and confidence for your party' : 'Tranquilidad y confianza para tu fiesta'
                },
                { 
                  icon: <Globe className="text-brand-yellow" size={48} strokeWidth={2} />, 
                  title: lang === 'pt' ? 'Experiência Brasileira' : lang === 'en' ? 'Brazilian Experience' : 'Experiencia Brasileña',
                  desc: lang === 'pt' ? 'Representando o Brasil com orgulho' : lang === 'en' ? 'Representing Brazil with pride' : 'Representando Brasil con orgullo'
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-brand-porcelain uppercase mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-porcelain/70 font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nosso Compromisso */}
      <section className="py-24 bg-brand-porcelain relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(var(--onyx) 1px, transparent 1px), linear-gradient(90deg, var(--onyx) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div 
            ref={commitmentRef}
            className={`max-w-4xl mx-auto scroll-reveal-fade-up ${isCommitmentVisible ? 'visible' : ''}`}
          >
            <div className="mb-12 text-center">
              <div className="flex justify-center mb-4">
                <Shield className="text-brand-sea" size={48} strokeWidth={2} />
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-black text-brand-onyx uppercase leading-none">
                {t.commitment.title}
              </h2>
            </div>
            
            {/* Texto completo - parágrafos juntos */}
            <div className="mb-12 text-center">
              <div className="space-y-6 text-lg text-brand-onyx/80 font-medium leading-relaxed max-w-3xl mx-auto">
                {t.commitment.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Espaço para foto */}
            <div className="mb-12">
              <div className="w-full h-64 md:h-96 bg-brand-porcelain border-2 border-dashed border-brand-onyx/20 flex items-center justify-center">
                <p className="text-brand-onyx/40 font-medium text-sm uppercase">
                  {lang === 'pt' ? 'Espaço para foto' : lang === 'en' ? 'Photo space' : 'Espacio para foto'}
                </p>
              </div>
            </div>

            {/* Grid de 2 colunas com ícones e títulos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
              {[
                { 
                  icon: <Star className="text-brand-sea" size={48} strokeWidth={2} />, 
                  title: lang === 'pt' ? 'Cada Pedido Importa' : lang === 'en' ? 'Every Order Matters' : 'Cada Pedido Importa',
                  desc: lang === 'pt' ? 'Tratamento único e personalizado' : lang === 'en' ? 'Unique and personalized treatment' : 'Tratamiento único y personalizado'
                },
                { 
                  icon: <Award className="text-brand-sea" size={48} strokeWidth={2} />, 
                  title: lang === 'pt' ? 'O Jeito Certo' : lang === 'en' ? 'The Right Way' : 'La Forma Correcta',
                  desc: lang === 'pt' ? 'Simples, bem feito, do jeito certo' : lang === 'en' ? 'Simple, well done, the right way' : 'Simple, bien hecho, de la forma correcta'
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-brand-onyx uppercase mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-brand-onyx/70 font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <button 
                onClick={onOrderClick}
                className="bg-brand-yellow text-brand-onyx text-xl font-bold px-12 py-6 uppercase tracking-wider border-2 border-brand-onyx shadow-[8px_8px_0px_0px_rgba(15,15,15,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-200"
              >
                {lang === 'pt' ? 'Fazer Pedido' : lang === 'en' ? 'Place Order' : 'Hacer Pedido'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

