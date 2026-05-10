import logoUrl from './whatsupplogo.png';

export default function Logo() {
  return (
    <div className="flex items-center gap-2 select-none">
      <img
        src={logoUrl}
        alt="WhatSupp logo"
        className="h-24 sm:h-28 w-auto"
        loading="eager"
      />
    </div>
  );
}
