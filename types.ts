
export type Language = 'pt' | 'en' | 'es';

export interface ProductDetails {
  ingredients: {
    pt: string[];
    en: string[];
    es: string[];
  };
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fats: string;
    servingSize: {
        pt: string;
        en: string;
        es: string;
    };
  };
  preparation?: {
    steps: {
        pt: string;
        en: string;
        es: string;
    }[];
    tips: {
        pt: string;
        en: string;
        es: string;
    };
  };
}

export interface Product {
  id: string;
  name: {
    pt: string;
    en: string;
    es: string;
  };
  description: {
    pt: string;
    en: string;
    es: string;
  };
  category: 'savory' | 'sweet';
  image: string; // URL placeholder
  price: number; // Base price (usually per 100)
  pricingTiers?: {
    quantity: number;
    price: number;
  }[];
  isPopular?: boolean;
  details?: ProductDetails; // Optional extended details
}

export interface Translation {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    deliveryBadge: string;
  };
  nav: {
    menu: string;
    howItWorks: string;
    about: string;
    orderBtn: string;
  };
  menu: {
    title: string;
    subtitle: string;
    savoryTab: string;
    sweetTab: string;
    unit: string;
    learnMore: string;
  };
  steps: {
    title: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: {
      name: string;
      text: string;
      location: string;
    }[];
  };
  ctaSection: {
    title: string;
    subtitle: string;
    button: string;
  };
  footer: {
    slogan: string;
    linksTitle: string;
    contactTitle: string;
    hoursTitle: string;
    followUsTitle: string;
    rights: string;
    location: string;
    madeIn: string;
    openDays: string;
    closedDays: string;
  };
  common: {
    whatsAppMessage: string;
  };
}
