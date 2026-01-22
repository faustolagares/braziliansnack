import { Language } from './types';

export const ROUTES: Record<Language, {
  home: string;
  calculator: string;
  product: string;
  about: string;
}> = {
  pt: {
    home: '/',
    calculator: '/calculadora',
    product: '/produto/:id',
    about: '/sobre'
  },
  en: {
    home: '/',
    calculator: '/calculator',
    product: '/product/:id',
    about: '/about'
  },
  es: {
    home: '/',
    calculator: '/calculadora',
    product: '/producto/:id',
    about: '/acerca-de'
  }
};

// Helper para obter rota sem parâmetros
export const getRoute = (lang: Language, route: 'home' | 'calculator' | 'product' | 'about', params?: { id?: string }): string => {
  let path = ROUTES[lang][route];
  if (route === 'product' && params?.id) {
    path = path.replace(':id', params.id);
  }
  return path;
};

