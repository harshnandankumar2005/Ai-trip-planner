import React, { useState } from 'react';
import { HelpCircle, Info } from 'lucide-react';

export default function Tooltip({ text, children, icon = 'info', position = 'top' }) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <span className="relative inline-flex items-center ml-1 select-none">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsVisible(!isVisible);
        }}
        className="text-slate-400 hover:text-accent-cyan transition-colors focus:outline-none p-0.5 rounded"
        aria-label="More information"
      >
        {children || (
          icon === 'info' ? (
            <Info className="w-3.5 h-3.5 inline-block" />
          ) : (
            <HelpCircle className="w-3.5 h-3.5 inline-block" />
          )
        )}
      </button>

      {isVisible && (
        <span
          className={`absolute ${positionClasses[position]} z-50 w-56 p-2.5 rounded-xl bg-[#1A2438] border border-white/10 text-[11px] text-slate-200 leading-relaxed shadow-xl shadow-black/60 backdrop-blur-xl pointer-events-none animate-fade-in text-left`}
        >
          {text}
        </span>
      )}
    </span>
  );
}
