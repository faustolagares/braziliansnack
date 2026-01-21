
import React, { useState, useEffect } from 'react';
import { Language, Product } from './types';
import { TRANSLATIONS, WHATSAPP_NUMBER } from './constants';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Marquee } from './components/Marquee';
import { CTASection } from './components/CTASection';
import { ProductDetails } from './components/ProductDetails';

const App: React.FC = () => {
  // Função para detectar idioma do navegador
  const detectLanguage = (): Language => {
    // 1. Verifica se há preferência salva no localStorage
    const savedLang = localStorage.getItem('preferred-language') as Language | null;
    if (savedLang && ['pt', 'en', 'es'].includes(savedLang)) {
      return savedLang;
    }

    // 2. Detecta idioma do navegador
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'pt';
    const langCode = browserLang.split('-')[0].toLowerCase();

    // 3. Mapeia para os idiomas suportados
    if (langCode === 'pt') return 'pt';
    if (langCode === 'en') return 'en';
    if (langCode === 'es') return 'es';
    
    // 4. Default para português
    return 'pt';
  };

  const [lang, setLang] = useState<Language>(detectLanguage());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const t = TRANSLATIONS[lang];

  // Salva a preferência quando o idioma muda e atualiza o HTML lang
  useEffect(() => {
    localStorage.setItem('preferred-language', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Reset scroll when navigating
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedProduct]);

  const handleOrderClick = () => {
    let message = t.common.whatsAppMessage;
    if (selectedProduct) {
        // Customize message if ordering specific product
        const productName = selectedProduct.name[lang];
        message = `${message} (Interesse em: ${productName})`;
    }
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleBackToHome = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-onyx selection:text-brand-yellow bg-brand-porcelain">
      <Header 
        lang={lang} 
        t={t.nav} 
        setLang={setLang} 
        onOrderClick={handleOrderClick} 
      />
      
      <main className="flex-grow">
        {selectedProduct ? (
            <ProductDetails 
              product={selectedProduct}
              lang={lang}
              t={t}
              onBack={handleBackToHome}
              onOrderClick={handleOrderClick}
            />
        ) : (
            <>
                <Hero 
                t={t.hero} 
                onOrderClick={handleOrderClick} 
                />
                
                <Marquee />

                <MenuSection 
                t={t.menu} 
                lang={lang} 
                onOrderClick={handleOrderClick} 
                onProductClick={handleProductClick}
                />
                
                <HowItWorks 
                t={t.steps} 
                />
                
                <Testimonials t={t.testimonials} />

                <CTASection t={t.ctaSection} onOrderClick={handleOrderClick} />
            </>
        )}
      </main>

      <Footer t={t.footer} lang={lang} />
      
      <FloatingWhatsApp onClick={handleOrderClick} />
    </div>
  );
};

export default App;
