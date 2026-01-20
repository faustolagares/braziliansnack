import React from 'react';
import { Language } from '../types';

interface Props {
  current: Language;
  onChange: (lang: Language) => void;
  variant?: 'light' | 'dark';
}

export const LanguageSwitcher: React.FC<Props> = ({ current, onChange, variant = 'light' }) => {
  const isLight = variant === 'light';
  const borderColor = isLight ? 'border-brand-onyx' : 'border-brand-porcelain';
  const textColor = isLight ? 'text-brand-onyx' : 'text-brand-porcelain';
  
  // Active state style
  const activeClass = isLight 
    ? 'bg-brand-onyx text-brand-yellow' 
    : 'bg-brand-porcelain text-brand-dark';

  return (
    <div className={`flex items-center border-2 ${borderColor} rounded-full p-0.5`}>
      {(['pt', 'en', 'es'] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => onChange(lang)}
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
            current === lang 
              ? activeClass
              : `${textColor} hover:opacity-60`
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};