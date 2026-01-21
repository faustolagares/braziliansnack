
import { Language, Product, Translation } from './types';

// Updated contact info
// WhatsApp number in international format (country code + number without spaces/special chars)
// (267) 726-0916 = 1 (US) + 2677260916 = 12677260916
export const WHATSAPP_NUMBER = "12677260916"; 
export const PHONE_NUMBERS = ["(267) 726-0916", "(856) 882-6237"];
export const DISPLAY_PHONE = PHONE_NUMBERS[0];

export const TRANSLATIONS: Record<Language, Translation> = {
  pt: {
    hero: {
      title: "O Verdadeiro Sabor do Brasil na Sua Festa",
      subtitle: "Salgadinhos e doces feitos na hora. Temos pacotes a partir de 30 unidades para todos os tamanhos de festa.",
      cta: "Fazer Pedido no WhatsApp",
      deliveryBadge: "Apenas Delivery • Feito sob Encomenda"
    },
    nav: {
      menu: "Cardápio",
      howItWorks: "Como Funciona",
      about: "Sobre",
      orderBtn: "Pedir Agora"
    },
    menu: {
      title: "Salgados",
      subtitle: "Escolha seus favoritos. Vendemos pacotes de 30, 50, 100 e 150 unidades.",
      unit: "O cento (100un)",
      learnMore: "Saiba mais..."
    },
    sweets: {
      title: "Doces",
      subtitle: "Doces tradicionais brasileiros para adoçar sua festa.",
      unit: "O cento (100un)",
      learnMore: "Saiba mais..."
    },
    features: {
      title: "O Que Oferecemos",
      subtitle: "Tudo que você precisa para sua festa ser um sucesso",
      delivery: {
        title: "Delivery Disponível",
        desc: "Entregamos em Delanco, Riverside, Delran e região."
      },
      frozen: {
        title: "Também Vendemos Congelado",
        desc: "Leve para casa e prepare quando quiser. Instruções incluídas."
      },
      madeToOrder: {
        title: "Feito Sob Encomenda",
        desc: "Tudo preparado na hora, garantindo frescor e qualidade."
      },
      packages: {
        title: "Pacotes para Festas",
        desc: "Pacotes de 30, 50, 100 e 150 unidades para todos os tamanhos."
      }
    },
    calculatorCTA: {
      title: "Calcule Seu Pedido",
      subtitle: "Use nossa calculadora para descobrir quantos salgados e doces você precisa para sua festa",
      button: "Abrir Calculadora",
      features: [
        "Cálculo automático por número de pessoas",
        "Selecione seus produtos favoritos",
        "Veja o preço total em tempo real",
        "Envie direto para o WhatsApp"
      ]
    },
    calculator: {
      title: "Calcule Seu Pedido",
      subtitle: "Informe o número de pessoas e escolha seus produtos",
      peopleLabel: "Número de pessoas",
      recommendedSavory: "Salgados recomendados",
      recommendedSweet: "Doces recomendados",
      selectProducts: "Selecione os produtos",
      quantity: "Quantidade",
      package: "Pacote",
      total: "Total",
      sendToWhatsApp: "Enviar para WhatsApp",
      reset: "Limpar",
      noProducts: "Selecione pelo menos um produto",
      backToHome: "Voltar para Home",
      orderMessage: "Olá! Gostaria de fazer um pedido:\n\n📋 PEDIDO PARA FESTA\n👥 Número de pessoas: {people}\n\n🍴 SALGADOS:\n{savoryList}\n\n🍰 DOCES:\n{sweetList}\n\n💰 TOTAL: ${total}\n\n[Produtos podem ser congelados ou prontos]"
    },
    steps: {
      title: "Simples e Rápido",
      step1Title: "Escolha",
      step1Desc: "Defina os sabores e o tamanho do pacote (30, 50, 100 ou 150 un).",
      step2Title: "Peça",
      step2Desc: "Envie seu pedido diretamente pelo nosso WhatsApp.",
      step3Title: "Receba",
      step3Desc: "Preparamos tudo fresquinho e entregamos no local da sua festa."
    },
    testimonials: {
      title: "Quem Provou, Amou",
      subtitle: "Veja o que nossos clientes estão falando sobre nossos salgadinhos.",
      items: [
        { name: "Sarah M.", text: "As melhores coxinhas de New Jersey! A massa é leve e o recheio é super temperado. Meus convidados americanos amaram.", location: "Delanco, NJ" },
        { name: "Roberto G.", text: "O kibe me lembrou da comida da minha avó. Chegou tudo quentinho e na hora certa. Recomendo demais!", location: "Riverside, NJ" },
        { name: "Amanda L.", text: "Os brigadeiros são divinos! Encomendei para o aniversário do meu filho e não sobrou nenhum. O de Leite Ninho é o melhor.", location: "Moorestown, NJ" },
        { name: "Mike T.", text: "Never had Brazilian snacks before, but these are addictive! The cheese balls (bolinha de queijo) are amazing.", location: "Delran, NJ" },
        { name: "Juliana R.", text: "Atendimento impecável e sabor autêntico. É difícil achar salgadinho bom assim nos EUA. Já virei cliente fiel.", location: "Cinnaminson, NJ" },
        { name: "David K.", text: "Great service and fair prices. The party kit was perfect for our office gathering. Everything was fresh.", location: "Cherry Hill, NJ" }
      ]
    },
    ctaSection: {
      title: "Vamos planejar sua festa?",
      subtitle: "Não deixe para a última hora. Garanta salgadinhos quentinhos e doces frescos para seus convidados.",
      button: "Falar com Atendente"
    },
    footer: {
      slogan: "Levando o sabor do Brasil para sua casa.",
      linksTitle: "Navegação",
      contactTitle: "Fale Conosco",
      hoursTitle: "Horários",
      followUsTitle: "Siga-nos",
      rights: "Todos os direitos reservados.",
      location: "Delanco, New Jersey",
      madeIn: "Feito com amor em NJ",
      openDays: "Seg - Sáb: 9am - 6pm",
      closedDays: "Domingo: Fechado",
      navLinks: ['Início', 'Cardápio', 'Sobre', 'Contato'],
      phoneLabel: 'Telefone / WhatsApp',
      locationLabel: 'Localização',
      deliveryTitle: 'Entregamos em'
    },
    common: {
      whatsAppMessage: "Olá! Gostaria de fazer um pedido no Brazilian's Snack."
    }
  },
  en: {
    hero: {
      title: "The Authentic Taste of Brazil at Your Party",
      subtitle: "Savory snacks and sweets made to order. We have packages starting from 30 units for parties of all sizes.",
      cta: "Order via WhatsApp",
      deliveryBadge: "Delivery Only • Made to Order"
    },
    nav: {
      menu: "Menu",
      howItWorks: "How it Works",
      about: "About",
      orderBtn: "Order Now"
    },
    menu: {
      title: "Savory Snacks",
      subtitle: "Pick your favorites. We sell packages of 30, 50, 100, and 150 units.",
      unit: "Per Hundred (100ct)",
      learnMore: "Learn more..."
    },
    sweets: {
      title: "Sweets",
      subtitle: "Traditional Brazilian sweets to sweeten your party.",
      unit: "Per Hundred (100ct)",
      learnMore: "Learn more..."
    },
    features: {
      title: "What We Offer",
      subtitle: "Everything you need to make your party a success",
      delivery: {
        title: "Delivery Available",
        desc: "We deliver to Delanco, Riverside, Delran and surrounding areas."
      },
      frozen: {
        title: "Also Available Frozen",
        desc: "Take home and prepare whenever you want. Instructions included."
      },
      madeToOrder: {
        title: "Made to Order",
        desc: "Everything prepared fresh, ensuring freshness and quality."
      },
      packages: {
        title: "Party Packages",
        desc: "Packages of 30, 50, 100 and 150 units for all sizes."
      }
    },
    calculatorCTA: {
      title: "Calculate Your Order",
      subtitle: "Use our calculator to find out how many snacks and sweets you need for your party",
      button: "Open Calculator",
      features: [
        "Automatic calculation by number of people",
        "Select your favorite products",
        "See total price in real time",
        "Send directly to WhatsApp"
      ]
    },
    calculator: {
      title: "Calculate Your Order",
      subtitle: "Enter the number of people and choose your products",
      peopleLabel: "Number of people",
      recommendedSavory: "Recommended savory snacks",
      recommendedSweet: "Recommended sweets",
      selectProducts: "Select products",
      quantity: "Quantity",
      package: "Package",
      total: "Total",
      sendToWhatsApp: "Send to WhatsApp",
      reset: "Clear",
      noProducts: "Select at least one product",
      backToHome: "Back to Home",
      orderMessage: "Hello! I would like to place an order:\n\n📋 PARTY ORDER\n👥 Number of people: {people}\n\n🍴 SAVORY SNACKS:\n{savoryList}\n\n🍰 SWEETS:\n{sweetList}\n\n💰 TOTAL: ${total}\n\n[Products can be frozen or ready]"
    },
    steps: {
      title: "Simple & Fast",
      step1Title: "Choose",
      step1Desc: "Pick your flavors and package size (30, 50, 100 or 150 ct).",
      step2Title: "Order",
      step2Desc: "Send your order directly through our WhatsApp.",
      step3Title: "Receive",
      step3Desc: "We prepare everything fresh and deliver to your event location."
    },
    testimonials: {
      title: "Love at First Bite",
      subtitle: "See what our customers are saying about our snacks.",
      items: [
        { name: "Sarah M.", text: "The best Coxinhas in New Jersey! The dough is light and the filling is perfectly seasoned. My American guests loved them.", location: "Delanco, NJ" },
        { name: "Roberto G.", text: "The Kibe reminded me of my grandmother's cooking. Everything arrived hot and on time. Highly recommend!", location: "Riverside, NJ" },
        { name: "Amanda L.", text: "The brigadeiros are divine! Ordered for my son's birthday and there were none left. The Milk Powder one is the best.", location: "Moorestown, NJ" },
        { name: "Mike T.", text: "Never had Brazilian snacks before, but these are addictive! The cheese balls (bolinha de queijo) are amazing.", location: "Delran, NJ" },
        { name: "Juliana R.", text: "Impeccable service and authentic taste. It's hard to find good snacks like this in the US. I'm already a loyal customer.", location: "Cinnaminson, NJ" },
        { name: "David K.", text: "Great service and fair prices. The party kit was perfect for our office gathering. Everything was fresh.", location: "Cherry Hill, NJ" }
      ]
    },
    ctaSection: {
      title: "Let's plan your party?",
      subtitle: "Don't leave it to the last minute. Ensure hot snacks and fresh sweets for your guests.",
      button: "Chat with us"
    },
    footer: {
      slogan: "Bringing the taste of Brazil to your home.",
      linksTitle: "Navigation",
      contactTitle: "Contact Us",
      hoursTitle: "Business Hours",
      followUsTitle: "Follow Us",
      rights: "All rights reserved.",
      location: "Delanco, New Jersey",
      madeIn: "Made with love in NJ",
      openDays: "Mon - Sat: 9am - 6pm",
      closedDays: "Sunday: Closed",
      navLinks: ['Home', 'Menu', 'About', 'Contact'],
      phoneLabel: 'Phone / WhatsApp',
      locationLabel: 'Location',
      deliveryTitle: 'We deliver to'
    },
    common: {
      whatsAppMessage: "Hello! I would like to place an order at Brazilian's Snack."
    }
  },
  es: {
    hero: {
      title: "El Auténtico Sabor de Brasil en Tu Fiesta",
      subtitle: "Aperitivos y dulces hechos al momento. Tenemos paquetes desde 30 unidades.",
      cta: "Pedir por WhatsApp",
      deliveryBadge: "Solo Delivery • Hecho por Encargo"
    },
    nav: {
      menu: "Menú",
      howItWorks: "Cómo Funciona",
      about: "Nosotros",
      orderBtn: "Pedir Ahora"
    },
    menu: {
      title: "Salados",
      subtitle: "Elige tus favoritos. Vendemos paquetes de 30, 50, 100 y 150 unidades.",
      unit: "El ciento (100ud)",
      learnMore: "Saber más..."
    },
    sweets: {
      title: "Dulces",
      subtitle: "Dulces tradicionales brasileños para endulzar tu fiesta.",
      unit: "El ciento (100ud)",
      learnMore: "Saber más..."
    },
    features: {
      title: "Lo Que Ofrecemos",
      subtitle: "Todo lo que necesitas para que tu fiesta sea un éxito",
      delivery: {
        title: "Delivery Disponible",
        desc: "Entregamos en Delanco, Riverside, Delran y región."
      },
      frozen: {
        title: "También Disponible Congelado",
        desc: "Llévalo a casa y prepáralo cuando quieras. Instrucciones incluidas."
      },
      madeToOrder: {
        title: "Hecho por Encargo",
        desc: "Todo preparado fresco, garantizando frescura y calidad."
      },
      packages: {
        title: "Paquetes para Fiestas",
        desc: "Paquetes de 30, 50, 100 y 150 unidades para todos los tamaños."
      }
    },
    calculatorCTA: {
      title: "Calcula Tu Pedido",
      subtitle: "Usa nuestra calculadora para descubrir cuántos aperitivos y dulces necesitas para tu fiesta",
      button: "Abrir Calculadora",
      features: [
        "Cálculo automático por número de personas",
        "Selecciona tus productos favoritos",
        "Ve el precio total en tiempo real",
        "Envía directo a WhatsApp"
      ]
    },
    calculator: {
      title: "Calcula Tu Pedido",
      subtitle: "Ingresa el número de personas y elige tus productos",
      peopleLabel: "Número de personas",
      recommendedSavory: "Salados recomendados",
      recommendedSweet: "Dulces recomendados",
      selectProducts: "Selecciona los productos",
      quantity: "Cantidad",
      package: "Paquete",
      total: "Total",
      sendToWhatsApp: "Enviar a WhatsApp",
      reset: "Limpiar",
      noProducts: "Selecciona al menos un producto",
      backToHome: "Volver al Inicio",
      orderMessage: "¡Hola! Me gustaría hacer un pedido:\n\n📋 PEDIDO PARA FIESTA\n👥 Número de personas: {people}\n\n🍴 SALADOS:\n{savoryList}\n\n🍰 DULCES:\n{sweetList}\n\n💰 TOTAL: ${total}\n\n[Productos pueden ser congelados o listos]"
    },
    steps: {
      title: "Simple y Rápido",
      step1Title: "Elige",
      step1Desc: "Define los sabores y el tamaño del paquete (30, 50, 100 o 150 un).",
      step2Title: "Pide",
      step2Desc: "Envía tu pedido directamente por nuestro WhatsApp.",
      step3Title: "Recibe",
      step3Desc: "Preparamos todo fresco y lo entregamos en tu evento."
    },
    testimonials: {
      title: "Amor al Primer Bocado",
      subtitle: "Mira lo que dicen nuestros clientes sobre nuestros aperitivos.",
      items: [
        { name: "Sarah M.", text: "¡Las mejores coxinhas de Nueva Jersey! La masa es ligera y el relleno está muy bien condimentado.", location: "Delanco, NJ" },
        { name: "Roberto G.", text: "El kibe me recordó a la comida de mi abuela. Llegó todo caliente y a tiempo. ¡Lo recomiendo mucho!", location: "Riverside, NJ" },
        { name: "Amanda L.", text: "¡Los brigadeiros son divinos! Pedí para el cumpleaños de mi hijo y no sobró ninguno.", location: "Moorestown, NJ" },
        { name: "Mike T.", text: "Nunca había probado aperitivos brasileños, ¡pero son adictivos! Las bolitas de queso son increíbles.", location: "Delran, NJ" },
        { name: "Juliana R.", text: "Servicio impecable y sabor auténtico. Es difícil encontrar buenos aperitivos así en EE. UU.", location: "Cinnaminson, NJ" },
        { name: "David K.", text: "Gran servicio y precios justos. El kit de fiesta fue perfecto para nuestra reunión de oficina.", location: "Cherry Hill, NJ" }
      ]
    },
    ctaSection: {
      title: "¿Planeamos tu fiesta?",
      subtitle: "No lo dejes para el último minuto. Asegura aperitivos calientes y dulces frescos para tus invitados.",
      button: "Hablar con nosotros"
    },
    footer: {
      slogan: "Llevando el sabor de Brasil a tu hogar.",
      linksTitle: "Navegación",
      contactTitle: "Contáctanos",
      hoursTitle: "Horarios",
      followUsTitle: "Síguenos",
      rights: "Todos los derechos reservados.",
      location: "Delanco, New Jersey",
      madeIn: "Hecho con amor en NJ",
      openDays: "Lun - Sáb: 9am - 6pm",
      closedDays: "Domingo: Cerrado",
      navLinks: ['Inicio', 'Menú', 'Nosotros', 'Contacto'],
      phoneLabel: 'Teléfono / WhatsApp',
      locationLabel: 'Ubicación',
      deliveryTitle: 'Entregamos en'
    },
    common: {
      whatsAppMessage: "¡Hola! Me gustaría hacer un pedido en Brazilian's Snack."
    }
  }
};

const STANDARD_SAVORY_PREPARATION = {
    steps: [
        { 
            pt: "Retire do congelador 10-15 minutos antes de fritar. Não descongele totalmente.",
            en: "Remove from freezer 10-15 minutes before frying. Do not thaw completely.",
            es: "Retirar del congelador 10-15 minutos antes de freír. No descongelar completamente."
        },
        {
            pt: "Aqueça o óleo a 180°C (350°F). O óleo deve ser suficiente para cobrir os salgados.",
            en: "Heat oil to 180°C (350°F). Oil should be enough to cover the snacks.",
            es: "Caliente el aceite a 180°C (350°F). El aceite debe ser suficiente para cubrir."
        },
        {
            pt: "Frite em pequenas quantidades por 3 a 4 minutos até ficarem dourados.",
            en: "Fry in small batches for 3 to 4 minutes until golden brown.",
            es: "Fría en pequeñas cantidades durante 3 a 4 minutos hasta que estén dorados."
        }
    ],
    tips: {
        pt: "Dica: Para manter a crocância, não coloque muitos salgados de uma vez para não esfriar o óleo.",
        en: "Tip: To maintain crispiness, do not overcrowd the pan to avoid cooling the oil.",
        es: "Consejo: Para mantener la frescura, no ponga demasiados a la vez para evitar enfriar el aceite."
    }
};

// Pricing Tiers Constants
const SAVORY_TIERS = [
    { quantity: 30, price: 22 },
    { quantity: 50, price: 35 },
    { quantity: 100, price: 60 },
    { quantity: 150, price: 95 }
];

const SWEET_TIERS = [
    { quantity: 30, price: 22 },
    { quantity: 50, price: 35 },
    { quantity: 100, price: 60 }
];

const CHURROS_TIERS = [
    { quantity: 50, price: 35 },
    { quantity: 100, price: 70 }
];

export const PRODUCTS: Product[] = [
  // --- SALGADOS ---
  {
    id: 'coxinha',
    category: 'savory',
    name: { pt: 'Coxinha', en: 'Coxinha (Chicken)', es: 'Coxinha (Pollo)' },
    description: { pt: 'A rainha dos salgados. Massa de batata dourada recheada com frango desfiado suculento e temperado.', en: 'The queen of Brazilian snacks. Golden potato dough filled with juicy seasoned shredded chicken.', es: 'La reina de los aperitivos. Masa de papa dorada rellena de pollo desmenuzado jugoso.' },
    image: 'https://images.unsplash.com/photo-1698867385412-f0464614138a?q=80&w=800&auto=format&fit=crop',
    price: 60,
    pricingTiers: SAVORY_TIERS,
    isPopular: true,
    details: {
        ingredients: {
            pt: ['Farinha de trigo', 'Caldo de galinha', 'Peito de frango', 'Cebola e Alho', 'Colorau', 'Farinha de rosca'],
            en: ['Wheat flour', 'Chicken broth', 'Chicken breast', 'Onion and Garlic', 'Annatto', 'Breadcrumbs'],
            es: ['Harina de trigo', 'Caldo de pollo', 'Pechuga de pollo', 'Cebolla y Ajo', 'Achiote', 'Pan rallado']
        },
        nutrition: {
            calories: 145,
            protein: '6g',
            carbs: '18g',
            fats: '5g',
            servingSize: { pt: '1 Unidade (30g)', en: '1 Unit (30g)', es: '1 Unidad (30g)' }
        },
        preparation: STANDARD_SAVORY_PREPARATION
    }
  },
  {
    id: 'bolinha-queijo',
    category: 'savory',
    name: { pt: 'Bolinha de Queijo', en: 'Cheese Balls', es: 'Bolitas de Queso' },
    description: { pt: 'Crocância pura por fora e uma explosão de queijo derretido por dentro. Impossível comer uma só.', en: 'Pure crispiness on the outside and an explosion of melted cheese on the inside. Impossible to eat just one.', es: 'Pura crocancia por fuera y una explosión de queso derretido por dentro.' },
    image: 'https://images.unsplash.com/photo-1629853907474-13c548542978?q=80&w=800&auto=format&fit=crop',
    price: 60,
    pricingTiers: SAVORY_TIERS,
    details: {
        ingredients: {
            pt: ['Queijo Mussarela', 'Farinha de trigo', 'Leite', 'Ovos', 'Orégano', 'Farinha de rosca'],
            en: ['Mozzarella cheese', 'Wheat flour', 'Milk', 'Eggs', 'Oregano', 'Breadcrumbs'],
            es: ['Queso mozzarella', 'Harina de trigo', 'Leche', 'Huevos', 'Orégano', 'Pan rallado']
        },
        nutrition: {
            calories: 95,
            protein: '4g',
            carbs: '8g',
            fats: '5g',
            servingSize: { pt: '1 Unidade (25g)', en: '1 Unit (25g)', es: '1 Unidad (25g)' }
        },
        preparation: STANDARD_SAVORY_PREPARATION
    }
  },
  {
    id: 'croquete-milho',
    category: 'savory',
    name: { pt: 'Croquete de Milho', en: 'Corn Croquette', es: 'Croqueta de Maíz' },
    description: { pt: 'Massa cremosa e aveludada à base de milho verde com um toque especial de queijo.', en: 'Creamy and velvety corn-based dough with a special touch of cheese.', es: 'Masa cremosa y aterciopelada a base de maíz dulce con un toque especial de queso.' },
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=800&auto=format&fit=crop',
    price: 60,
    pricingTiers: SAVORY_TIERS,
    details: {
        ingredients: {
            pt: ['Milho verde', 'Farinha de trigo', 'Leite', 'Queijo Parmesão', 'Manteiga', 'Cebola'],
            en: ['Sweet corn', 'Wheat flour', 'Milk', 'Parmesan Cheese', 'Butter', 'Onion'],
            es: ['Maíz dulce', 'Harina de trigo', 'Leche', 'Queso parmesano', 'Mantequilla', 'Cebolla']
        },
        nutrition: {
            calories: 90,
            protein: '3g',
            carbs: '14g',
            fats: '3g',
            servingSize: { pt: '1 Unidade (25g)', en: '1 Unit (25g)', es: '1 Unidad (25g)' }
        },
        preparation: STANDARD_SAVORY_PREPARATION
    }
  },
  {
    id: 'risole',
    category: 'savory',
    name: { pt: 'Risole', en: 'Risole (Beef/Cheese)', es: 'Risole' },
    description: { pt: 'O clássico em formato de meia-lua. Massa macia recheada com carne moída temperada ou queijo.', en: 'The half-moon classic. Soft dough filled with seasoned ground beef or cheese.', es: 'El clásico en forma de media luna. Masa suave rellena de carne molida o queso.' },
    image: 'https://images.unsplash.com/photo-1589133342082-969446365f57?q=80&w=800&auto=format&fit=crop',
    price: 60,
    pricingTiers: SAVORY_TIERS,
    details: {
        ingredients: {
            pt: ['Farinha de trigo', 'Leite', 'Carne moída ou Queijo', 'Manteiga', 'Farinha de rosca'],
            en: ['Wheat flour', 'Milk', 'Ground beef or Cheese', 'Butter', 'Breadcrumbs'],
            es: ['Harina de trigo', 'Leche', 'Carne molida o Queso', 'Mantequilla', 'Pan rallado']
        },
        nutrition: {
            calories: 110,
            protein: '5g',
            carbs: '12g',
            fats: '4.5g',
            servingSize: { pt: '1 Unidade (30g)', en: '1 Unit (30g)', es: '1 Unidad (30g)' }
        },
        preparation: STANDARD_SAVORY_PREPARATION
    }
  },
  {
    id: 'tamborzinho',
    category: 'savory',
    name: { pt: 'Tamborzinho', en: 'Ham & Cheese Roll', es: 'Tamborzinho' },
    description: { pt: 'Delicioso enroladinho de massa macia recheado com a combinação perfeita de queijo e presunto.', en: 'Delicious soft dough roll filled with the perfect combination of ham and cheese.', es: 'Delicioso rollo de masa suave relleno con la combinación perfecta de jamón y queso.' },
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop', // Reusing similar image style
    price: 60,
    pricingTiers: SAVORY_TIERS,
    details: {
        ingredients: {
            pt: ['Farinha de trigo', 'Leite', 'Presunto', 'Queijo Mussarela', 'Manteiga', 'Farinha de rosca'],
            en: ['Wheat flour', 'Milk', 'Ham', 'Mozzarella', 'Butter', 'Breadcrumbs'],
            es: ['Harina de trigo', 'Leche', 'Jamón', 'Queso mozzarella', 'Mantequilla', 'Pan rallado']
        },
        nutrition: {
            calories: 115,
            protein: '5.5g',
            carbs: '12g',
            fats: '5g',
            servingSize: { pt: '1 Unidade (30g)', en: '1 Unit (30g)', es: '1 Unidad (30g)' }
        },
        preparation: STANDARD_SAVORY_PREPARATION
    }
  },
  {
    id: 'kibe',
    category: 'savory',
    name: { pt: 'Kibe', en: 'Kibe (Beef)', es: 'Kibe' },
    description: { pt: 'Herança árabe com toque brasileiro. Trigo, carne bovina e hortelã fresca para um sabor marcante.', en: 'Arab heritage with a Brazilian touch. Bulgur wheat, beef, and fresh mint for a striking flavor.', es: 'Herencia árabe con toque brasileño. Trigo, carne de res y menta fresca.' },
    image: 'https://images.unsplash.com/photo-1579887829663-67706e62e6ac?q=80&w=800&auto=format&fit=crop',
    price: 60,
    pricingTiers: SAVORY_TIERS,
    details: {
        ingredients: {
            pt: ['Carne moída (Bovina)', 'Trigo para kibe', 'Hortelã fresca', 'Cebola', 'Alho', 'Pimenta síria'],
            en: ['Ground beef', 'Bulgur wheat', 'Fresh mint', 'Onion', 'Garlic', 'Allspice'],
            es: ['Carne molida', 'Trigo burgol', 'Menta fresca', 'Cebolla', 'Ajo', 'Pimienta de Jamaica']
        },
        nutrition: {
            calories: 120,
            protein: '8g',
            carbs: '10g',
            fats: '4g',
            servingSize: { pt: '1 Unidade (30g)', en: '1 Unit (30g)', es: '1 Unidad (30g)' }
        },
        preparation: STANDARD_SAVORY_PREPARATION
    }
  },
  {
    id: 'enroladinho',
    category: 'savory',
    name: { pt: 'Enroladinho', en: 'Sausage Roll', es: 'Enrolladito' },
    description: { pt: 'O favorito das crianças. Salsicha envolta em nossa massa especial e empanada.', en: 'Kids favorite. Hot dog sausage wrapped in our special dough and breaded.', es: 'El favorito de los niños. Salchicha envuelta en nuestra masa especial.' },
    image: 'https://images.unsplash.com/photo-1599321955726-e04842d6f263?q=80&w=800&auto=format&fit=crop',
    price: 60,
    pricingTiers: SAVORY_TIERS,
    details: {
        ingredients: {
            pt: ['Salsicha', 'Farinha de trigo', 'Leite', 'Ovos', 'Óleo', 'Farinha de rosca'],
            en: ['Hot dog sausage', 'Wheat flour', 'Milk', 'Eggs', 'Oil', 'Breadcrumbs'],
            es: ['Salchicha', 'Harina de trigo', 'Leche', 'Huevos', 'Aceite', 'Pan rallado']
        },
        nutrition: {
            calories: 130,
            protein: '5g',
            carbs: '10g',
            fats: '8g',
            servingSize: { pt: '1 Unidade (30g)', en: '1 Unit (30g)', es: '1 Unidad (30g)' }
        },
        preparation: STANDARD_SAVORY_PREPARATION
    }
  },

  // --- SWEETS ---
  {
    id: 'mini-churros',
    category: 'sweet',
    name: { pt: 'Mini Churros', en: 'Mini Churros', es: 'Mini Churros' },
    description: { pt: 'Crocantes, passados no açúcar e canela, recheados com muito doce de leite.', en: 'Crispy, coated in sugar and cinnamon, filled with plenty of dulce de leche.', es: 'Crujientes, pasados por azúcar y canela, rellenos con mucho dulce de leche.' },
    image: 'https://images.unsplash.com/photo-1624371414361-e670edf4898d?q=80&w=800&auto=format&fit=crop',
    price: 70, // Base price 100u
    pricingTiers: CHURROS_TIERS,
    isPopular: true,
    details: {
        ingredients: {
            pt: ['Farinha de trigo', 'Doce de Leite', 'Açúcar', 'Canela', 'Óleo'],
            en: ['Wheat flour', 'Dulce de Leche', 'Sugar', 'Cinnamon', 'Oil'],
            es: ['Harina de trigo', 'Dulce de leche', 'Azúcar', 'Canela', 'Aceite']
        },
        nutrition: {
            calories: 110,
            protein: '2g',
            carbs: '18g',
            fats: '4g',
            servingSize: { pt: '1 Unidade (25g)', en: '1 Unit (25g)', es: '1 Unidad (25g)' }
        }
    }
  },
  {
    id: 'brigadeiro',
    category: 'sweet',
    name: { pt: 'Brigadeiro', en: 'Brigadeiro (Chocolate)', es: 'Brigadeiro' },
    description: { pt: 'O ícone do Brasil. Chocolate nobre e leite condensado cozidos no ponto perfeito.', en: 'The icon of Brazil. Fine chocolate and condensed milk cooked to perfection.', es: 'El ícono de Brasil. Chocolate fino y leche condensada cocidos a la perfección.' },
    image: 'https://images.unsplash.com/photo-1598904797089-63a9254c414d?q=80&w=800&auto=format&fit=crop',
    price: 60,
    pricingTiers: SWEET_TIERS,
    isPopular: true,
    details: {
        ingredients: {
            pt: ['Leite condensado', 'Cacau em pó', 'Manteiga', 'Chocolate granulado'],
            en: ['Condensed milk', 'Cocoa powder', 'Butter', 'Chocolate sprinkles'],
            es: ['Leche condensada', 'Cacao en polvo', 'Mantequilla', 'Granillo de chocolate']
        },
        nutrition: {
            calories: 85,
            protein: '2g',
            carbs: '12g',
            fats: '3.5g',
            servingSize: { pt: '1 Unidade (20g)', en: '1 Unit (20g)', es: '1 Unidad (20g)' }
        }
    }
  },
  {
    id: 'beijinho',
    category: 'sweet',
    name: { pt: 'Beijinho', en: 'Beijinho (Coconut)', es: 'Beijinho (Coco)' },
    description: { pt: 'Doce delicado de coco com leite condensado e o tradicional cravo da índia.', en: 'Delicate coconut sweet with condensed milk and the traditional clove.', es: 'Dulce delicado de coco con leche condensada y el tradicional clavo.' },
    image: 'https://images.unsplash.com/photo-1522037682970-07e324c4249a?q=80&w=800&auto=format&fit=crop',
    price: 60,
    pricingTiers: SWEET_TIERS,
    details: {
        ingredients: {
            pt: ['Leite condensado', 'Coco ralado', 'Manteiga', 'Cravo da índia', 'Açúcar'],
            en: ['Condensed milk', 'Shredded coconut', 'Butter', 'Clove', 'Sugar'],
            es: ['Leche condensada', 'Coco rallado', 'Mantequilla', 'Clavo', 'Azúcar']
        },
        nutrition: {
            calories: 80,
            protein: '1.5g',
            carbs: '11g',
            fats: '4g',
            servingSize: { pt: '1 Unidade (20g)', en: '1 Unit (20g)', es: '1 Unidad (20g)' }
        }
    }
  },
  {
    id: 'ninho',
    category: 'sweet',
    name: { pt: 'Ninho', en: 'Ninho (Milk Powder)', es: 'Ninho' },
    description: { pt: 'Cremoso e suave, feito com o autêntico Leite Ninho. Derrete na boca.', en: 'Creamy and smooth, made with authentic Ninho milk powder. Melts in your mouth.', es: 'Cremoso y suave, hecho con auténtica leche Ninho.' },
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf584?q=80&w=800&auto=format&fit=crop',
    price: 60,
    pricingTiers: SWEET_TIERS,
    details: {
        ingredients: {
            pt: ['Leite Ninho (Leite em pó)', 'Leite condensado', 'Manteiga', 'Creme de leite'],
            en: ['Ninho Milk Powder', 'Condensed milk', 'Butter', 'Heavy cream'],
            es: ['Leche en polvo Ninho', 'Leche condensada', 'Mantequilla', 'Crema de leche']
        },
        nutrition: {
            calories: 90,
            protein: '3g',
            carbs: '10g',
            fats: '4g',
            servingSize: { pt: '1 Unidade (20g)', en: '1 Unit (20g)', es: '1 Unidad (20g)' }
        }
    }
  },
  {
    id: 'olho-sogra',
    category: 'sweet',
    name: { pt: 'Olho de Sogra', en: 'Olho de Sogra', es: 'Olho de Sogra' },
    description: { pt: 'Combinação clássica e sofisticada: ameixa preta macia recheada com doce de coco.', en: 'Classic and sophisticated combination: soft prune stuffed with coconut sweet.', es: 'Combinación clásica: ciruela pasa suave rellena de dulce de coco.' },
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476d?q=80&w=800&auto=format&fit=crop',
    price: 60,
    pricingTiers: SWEET_TIERS,
    details: {
        ingredients: {
            pt: ['Ameixa preta', 'Leite condensado', 'Coco ralado', 'Manteiga'],
            en: ['Dried prune', 'Condensed milk', 'Shredded coconut', 'Butter'],
            es: ['Ciruela pasa', 'Leche condensada', 'Coco rallado', 'Mantequilla']
        },
        nutrition: {
            calories: 75,
            protein: '1g',
            carbs: '15g',
            fats: '2g',
            servingSize: { pt: '1 Unidade (25g)', en: '1 Unit (25g)', es: '1 Unidad (25g)' }
        }
    }
  },
  {
    id: 'bicho-pe',
    category: 'sweet',
    name: { pt: 'Bicho de Pé', en: 'Strawberry Truffle', es: 'Trufa de Fresa' },
    description: { pt: 'Brigadeiro rosa com sabor de morango. Doce, divertido e delicioso.', en: 'Pink strawberry-flavored truffle. Sweet, fun, and delicious.', es: 'Brigadeiro rosa con sabor a fresa. Dulce y delicioso.' },
    image: 'https://images.unsplash.com/photo-1582650059736-231a47738f71?q=80&w=800&auto=format&fit=crop',
    price: 60,
    pricingTiers: SWEET_TIERS,
    details: {
        ingredients: {
            pt: ['Leite condensado', 'Preparado de morango (Nesquik)', 'Manteiga', 'Açúcar cristal'],
            en: ['Condensed milk', 'Strawberry powder', 'Butter', 'Crystal sugar'],
            es: ['Leche condensada', 'Polvo de fresa', 'Mantequilla', 'Azúcar cristal']
        },
        nutrition: {
            calories: 85,
            protein: '2g',
            carbs: '13g',
            fats: '3.5g',
            servingSize: { pt: '1 Unidade (20g)', en: '1 Unit (20g)', es: '1 Unidad (20g)' }
        }
    }
  }
];
