import { Language } from './types';

export const ROUTES: Record<Language, {
  home: string;
  calculator: string;
  product: string;
}> = {
  pt: {
    home: '/',
    calculator: '/calculadora',
    product: '/produto/:id'
  },
  en: {
    home: '/',
    calculator: '/calculator',
    product: '/product/:id'
  },
  es: {
    home: '/',
    calculator: '/calculadora',
    product: '/producto/:id'
  }
};

// Helper para obter rota sem parâmetros
export const getRoute = (lang: Language, route: 'home' | 'calculator' | 'product', params?: { id?: string }): string => {
  let path = ROUTES[lang][route];
  if (route === 'product' && params?.id) {
    path = path.replace(':id', params.id);
  }
  return path;
};

