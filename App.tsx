
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Language, Product } from './types';
import { TRANSLATIONS, WHATSAPP_NUMBER, PRODUCTS } from './constants';
import { ROUTES, getRoute } from './routes';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturesSection } from './components/FeaturesSection';
import { CalculatorCTA } from './components/CalculatorCTA';
import { CalculatorPage } from './components/CalculatorPage';
import { MenuSection } from './components/MenuSection';
import { SweetSection } from './components/SweetSection';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Marquee } from './components/Marquee';
import { CTASection } from './components/CTASection';
import { ProductDetails } from './components/ProductDetails';
import { AboutPage } from './components/AboutPage';

// Componente interno que usa hooks do router
const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Função para detectar idioma baseado na URL ou preferências
  const detectLanguageFromRoute = (): Language => {
    const path = location.pathname;
    
    // Detectar idioma pela rota
    if (path.startsWith('/calculator')) {
      return 'en';
    } else if (path.startsWith('/calculadora')) {
      // Pode ser pt ou es, verificar localStorage primeiro
      const savedLang = localStorage.getItem('preferred-language') as Language | null;
      if (savedLang && ['pt', 'es'].includes(savedLang)) {
        return savedLang;
      }
      // Se não tiver salvo, verificar navegador
      const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'pt';
      const langCode = browserLang.split('-')[0].toLowerCase();
      if (langCode === 'es') return 'es';
      return 'pt'; // Default para pt
    } else if (path.startsWith('/about')) {
      return 'en';
    } else if (path.startsWith('/acerca-de')) {
      return 'es';
    } else if (path.startsWith('/sobre')) {
      return 'pt';
    } else if (path.startsWith('/producto')) {
      return 'es';
    } else if (path.startsWith('/product/') && !path.startsWith('/producto')) {
      return 'en';
    } else if (path.startsWith('/produto')) {
      return 'pt';
    }
    
    // Se não detectar pela URL, usar preferência salva ou navegador
    const savedLang = localStorage.getItem('preferred-language') as Language | null;
    if (savedLang && ['pt', 'en', 'es'].includes(savedLang)) {
      return savedLang;
    }

    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'pt';
    const langCode = browserLang.split('-')[0].toLowerCase();
    if (langCode === 'pt') return 'pt';
    if (langCode === 'en') return 'en';
    if (langCode === 'es') return 'es';
    
    return 'pt';
  };

  const [lang, setLang] = useState<Language>(detectLanguageFromRoute());
  
  const t = TRANSLATIONS[lang];

  // Atualizar idioma quando a rota mudar
  useEffect(() => {
    const newLang = detectLanguageFromRoute();
    if (newLang !== lang) {
      setLang(newLang);
    }
  }, [location.pathname]);

  // Salva a preferência quando o idioma muda e atualiza o HTML lang
  useEffect(() => {
    localStorage.setItem('preferred-language', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Reset scroll when navigating
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleOrderClick = () => {
    const message = t.common.whatsAppMessage;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  const handleProductClick = (product: Product) => {
    navigate(getRoute(lang, 'product', { id: product.id }));
  };

  const handleBackToHome = () => {
    navigate(ROUTES[lang].home);
  };

  const handleOpenCalculator = () => {
    navigate(ROUTES[lang].calculator);
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    // Redirecionar para a rota no novo idioma
    const currentPath = location.pathname;
    if (currentPath === ROUTES.pt.calculator || currentPath === ROUTES.en.calculator || currentPath === ROUTES.es.calculator) {
      navigate(ROUTES[newLang].calculator);
    } else if (currentPath === ROUTES.pt.about || currentPath === ROUTES.en.about || currentPath === ROUTES.es.about) {
      navigate(ROUTES[newLang].about);
    } else if (currentPath.startsWith('/produto/') || currentPath.startsWith('/product/') || currentPath.startsWith('/producto/')) {
      const productId = currentPath.split('/').pop();
      if (productId) {
        navigate(getRoute(newLang, 'product', { id: productId }));
      }
    } else {
      navigate(ROUTES[newLang].home);
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-onyx selection:text-brand-yellow bg-brand-porcelain">
          <Header 
            lang={lang} 
            t={t.nav} 
            setLang={handleLanguageChange} 
            onOrderClick={handleOrderClick} 
            onHomeClick={() => navigate(ROUTES[lang].home)}
            onCalculatorClick={() => navigate(ROUTES[lang].calculator)}
            onAboutClick={() => navigate(ROUTES[lang].about)}
          />
      
      <main className="flex-grow">
        <Routes>
          {/* Rotas da Calculadora */}
          <Route path={ROUTES.pt.calculator} element={
            <CalculatorPage 
              t={TRANSLATIONS.pt}
              lang="pt"
              onBack={handleBackToHome}
            />
          } />
          <Route path={ROUTES.en.calculator} element={
            <CalculatorPage 
              t={TRANSLATIONS.en}
              lang="en"
              onBack={handleBackToHome}
            />
          } />
          <Route path={ROUTES.es.calculator} element={
            <CalculatorPage 
              t={TRANSLATIONS.es}
              lang="es"
              onBack={handleBackToHome}
            />
          } />

          {/* Rotas de Produtos */}
          <Route path={ROUTES.pt.product} element={<ProductRoute lang="pt" onBack={handleBackToHome} onOrderClick={handleOrderClick} />} />
          <Route path={ROUTES.en.product} element={<ProductRoute lang="en" onBack={handleBackToHome} onOrderClick={handleOrderClick} />} />
          <Route path={ROUTES.es.product} element={<ProductRoute lang="es" onBack={handleBackToHome} onOrderClick={handleOrderClick} />} />

          {/* Rotas da Página Sobre */}
          <Route path={ROUTES.pt.about} element={
            <AboutPage 
              t={TRANSLATIONS.pt.about}
              lang="pt"
              onOrderClick={handleOrderClick}
            />
          } />
          <Route path={ROUTES.en.about} element={
            <AboutPage 
              t={TRANSLATIONS.en.about}
              lang="en"
              onOrderClick={handleOrderClick}
            />
          } />
          <Route path={ROUTES.es.about} element={
            <AboutPage 
              t={TRANSLATIONS.es.about}
              lang="es"
              onOrderClick={handleOrderClick}
            />
          } />

          {/* Rotas Home (todas as rotas home apontam para o mesmo componente) */}
          <Route path={ROUTES.pt.home} element={
            <HomePage 
              lang={lang}
              t={t}
              onOrderClick={handleOrderClick}
              onProductClick={handleProductClick}
              onOpenCalculator={handleOpenCalculator}
            />
          } />
          <Route path={ROUTES.en.home} element={
            <HomePage 
              lang={lang}
              t={t}
              onOrderClick={handleOrderClick}
              onProductClick={handleProductClick}
              onOpenCalculator={handleOpenCalculator}
            />
          } />
          <Route path={ROUTES.es.home} element={
            <HomePage 
              lang={lang}
              t={t}
              onOrderClick={handleOrderClick}
              onProductClick={handleProductClick}
              onOpenCalculator={handleOpenCalculator}
            />
          } />
        </Routes>
      </main>

      <Footer t={t.footer} lang={lang} />
      
      <FloatingWhatsApp onClick={handleOrderClick} orderBtnText={t.nav.orderBtn} />
    </div>
  );
};

// Componente para rota de produto
const ProductRoute: React.FC<{ lang: Language; onBack: () => void; onOrderClick: () => void }> = ({ lang, onBack, onOrderClick }) => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const t = TRANSLATIONS[lang];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Produto não encontrado</h1>
          <button onClick={onBack} className="bg-brand-yellow text-brand-onyx px-6 py-3 font-bold">
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProductDetails 
      product={product}
      lang={lang}
      t={t}
      onBack={onBack}
      onOrderClick={onOrderClick}
    />
  );
};

// Componente Home
const HomePage: React.FC<{
  lang: Language;
  t: typeof TRANSLATIONS.pt;
  onOrderClick: () => void;
  onProductClick: (product: Product) => void;
  onOpenCalculator: () => void;
}> = ({ lang, t, onOrderClick, onProductClick, onOpenCalculator }) => {
  return (
    <>
      <Hero 
        t={t.hero} 
        onOrderClick={onOrderClick} 
      />
      
      <Marquee />

      <FeaturesSection t={t.features} />

      <CalculatorCTA 
        t={t.calculatorCTA} 
        onOpenCalculator={onOpenCalculator}
      />

      <MenuSection 
        t={t.menu} 
        lang={lang} 
        onOrderClick={onOrderClick} 
        onProductClick={onProductClick}
      />
      
      <SweetSection 
        t={t.sweets} 
        lang={lang} 
        onOrderClick={onOrderClick} 
        onProductClick={onProductClick}
      />
      
      <HowItWorks 
        t={t.steps} 
      />
      
      <Testimonials t={t.testimonials} />

      <CTASection t={t.ctaSection} onOrderClick={onOrderClick} />
    </>
  );
};

// App principal com Router
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
