import React from 'react';

export const Marquee: React.FC = () => {
  const items = [
    "COXINHA", "BRIGADEIRO", "KIBE", "BEIJINHO", "DELIVERY", "FRESH", "BRASIL", "PARTY"
  ];

  return (
    <div className="bg-brand-yellow border-y-2 border-brand-onyx overflow-hidden py-4 animate-fadeInUp">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center">
            {items.map((item, idx) => (
              <React.Fragment key={`${i}-${idx}`}>
                <span className="text-4xl font-display font-black text-brand-onyx mx-8 uppercase">
                  {item}
                </span>
                <span className="text-brand-dark text-2xl">✦</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};