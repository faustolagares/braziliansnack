
import React from 'react';
import { Translation } from '../types';
import { PHONE_NUMBERS } from '../constants';
import { Instagram, Facebook, MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';

interface Props {
  t: Translation['footer'];
}

export const Footer: React.FC<Props> = ({ t }) => {
  return (
    <footer id="footer" className="bg-[#050505] text-brand-porcelain pt-32 pb-0 border-t-8 border-brand-yellow relative overflow-hidden">
      
      {/* Background Pattern - Minimalist Dots */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, var(--porcelain) 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }}></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Top Section: Brand & Slogan */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
           <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="/images/brazilian-snack-logo.png" 
                  alt="Brazilian's Snack Logo" 
                  className="h-12 w-12 object-contain"
                />
                <span className="font-display font-semibold text-4xl tracking-tight">Brazilian's Snack</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black leading-[1.1] uppercase text-transparent" style={{ WebkitTextStroke: '1px var(--porcelain)' }}>
                {t.slogan}
              </h2>
           </div>
           
           <div className="flex gap-4">
              <a href="#" className="w-16 h-16 border-2 border-brand-porcelain rounded-full flex items-center justify-center hover:bg-brand-yellow hover:border-brand-yellow hover:text-brand-onyx transition-all duration-300 group">
                <Instagram size={32} strokeWidth={1.5} className="group-hover:scale-110 transition-transform"/>
              </a>
              <a href="#" className="w-16 h-16 border-2 border-brand-porcelain rounded-full flex items-center justify-center hover:bg-brand-yellow hover:border-brand-yellow hover:text-brand-onyx transition-all duration-300 group">
                <Facebook size={32} strokeWidth={1.5} className="group-hover:scale-110 transition-transform"/>
              </a>
           </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-32 border-t border-brand-porcelain/10 pt-16">
          
          {/* Column 1: Navigation */}
          <div>
            <h4 className="font-display font-bold text-lg text-brand-yellow mb-8 uppercase tracking-wider flex items-center gap-2">
              {t.linksTitle}
            </h4>
            <ul className="space-y-4">
              {['Home', 'Menu', 'Sobre', 'Contato'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xl text-brand-porcelain/70 hover:text-brand-yellow hover:pl-2 transition-all duration-200 flex items-center gap-2 group">
                    {item} <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Hours */}
          <div>
            <h4 className="font-display font-bold text-lg text-brand-yellow mb-8 uppercase tracking-wider flex items-center gap-2">
              <Clock size={20} />
              {t.hoursTitle}
            </h4>
            <div className="space-y-4 text-brand-porcelain/70 text-lg">
              <p>{t.openDays}</p>
              <p className="text-brand-porcelain/40">{t.closedDays}</p>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-display font-bold text-lg text-brand-yellow mb-8 uppercase tracking-wider flex items-center gap-2">
              {t.contactTitle}
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="p-2 bg-brand-porcelain/5 rounded text-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-onyx transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-brand-porcelain/40 uppercase font-bold mb-1">Telefone / WhatsApp</p>
                  <p className="text-xl font-medium">{PHONE_NUMBERS[0]}</p>
                  <p className="text-xl font-medium">{PHONE_NUMBERS[1]}</p>
                </div>
              </li>
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="p-2 bg-brand-porcelain/5 rounded text-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-onyx transition-colors">
                   <MapPin size={20} />
                </div>
                <div>
                   <p className="text-xs text-brand-porcelain/40 uppercase font-bold mb-1">Localização</p>
                   <p className="text-lg leading-snug text-brand-porcelain/80">{t.location}</p>
                   <span className="text-xs text-brand-jungle bg-brand-jungle/10 px-2 py-0.5 rounded mt-2 inline-block">Delivery Only</span>
                </div>
              </li>
            </ul>
          </div>

           {/* Column 4: Delivery Areas */}
           <div>
            <h4 className="font-display font-bold text-lg text-brand-yellow mb-8 uppercase tracking-wider flex items-center gap-2">
              Entregamos em
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Delanco', 'Riverside', 'Delran', 'Cinnaminson', 'Moorestown', 'Palmyra', 'Riverton'].map(city => (
                <span key={city} className="px-3 py-1 border border-brand-porcelain/20 rounded-full text-sm hover:bg-brand-porcelain hover:text-brand-onyx transition-colors cursor-default">
                  {city}, NJ
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center py-8 border-t border-brand-porcelain/10 text-sm text-brand-porcelain/40 font-mono uppercase">
          <p>{t.rights}</p>
          <p>{t.madeIn}</p>
        </div>

        {/* Massive Footer Text */}
        <div className="w-full overflow-hidden leading-none opacity-10 select-none pb-4 pointer-events-none">
          <span className="text-[12vw] md:text-[14vw] font-display font-black text-brand-porcelain whitespace-nowrap -ml-4 block">
            BRAZILIAN'S SNACK
          </span>
        </div>

      </div>
    </footer>
  );
};
