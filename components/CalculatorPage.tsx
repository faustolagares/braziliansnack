
import React from 'react';
import { Translation, Language } from '../types';
import { PartyCalculator } from './PartyCalculator';
import { ArrowLeft } from 'lucide-react';

interface Props {
  t: Translation;
  lang: Language;
  onBack: () => void;
}

export const CalculatorPage: React.FC<Props> = ({ t, lang, onBack }) => {
  return (
    <div className="min-h-screen bg-brand-porcelain">
      {/* Back Button */}
      <div className="container mx-auto px-4 md:px-8 pt-24 pb-8">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 font-bold uppercase tracking-wide text-sm text-brand-onyx hover:text-brand-sea transition-colors"
        >
          <div className="bg-white border-2 border-brand-onyx p-2 transition-all group-hover:-translate-x-1">
            <ArrowLeft size={20} />
          </div>
          <span>{t.calculator.backToHome}</span>
        </button>
      </div>

      {/* Calculator */}
      <PartyCalculator t={t.calculator} lang={lang} />
    </div>
  );
};

