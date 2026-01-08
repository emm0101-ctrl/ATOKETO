import React from 'react';

interface MarqueeProps {
  text: string;
  className?: string;
  bgColor?: string;
  textColor?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ 
  text, 
  className = '', 
  bgColor = 'bg-brand-dark', 
  textColor = 'text-white' 
}) => {
  return (
    <div className={`relative flex overflow-hidden py-4 ${bgColor} ${className}`}>
      <div className={`animate-marquee whitespace-nowrap flex items-center`}>
        <span className={`text-4xl md:text-6xl font-black mx-4 ${textColor}`}>{text}</span>
        <span className={`text-4xl md:text-6xl font-black mx-4 ${textColor}`}>{text}</span>
        <span className={`text-4xl md:text-6xl font-black mx-4 ${textColor}`}>{text}</span>
        <span className={`text-4xl md:text-6xl font-black mx-4 ${textColor}`}>{text}</span>
      </div>
      <div className={`absolute top-0 animate-marquee2 whitespace-nowrap flex items-center`}>
         {/* Second copy for seamless loop logic if needed, but simple duplicate usually works for basic marquee */}
      </div>
    </div>
  );
};