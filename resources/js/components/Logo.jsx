
export default function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* Image logo */}
      <img
        src="/images/whatsupplogo.png"        
        alt="WhatSupp logo"
        className="h-24 sm:h-28 w-auto"
        loading="eager"               // eager for brand logo, or 'lazy' if below the fold
        decoding="async"
      />
    </div>
  );
}
