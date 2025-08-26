import React from 'react';

interface FlagIconProps {
  className?: string;
}

// Bandera de España
export const SpainFlag: React.FC<FlagIconProps> = ({ className = '' }) => (
  <svg
    className={`flag-icon ${className}`}
    viewBox="0 0 750 500"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="750" height="500" fill="#aa151b"/>
    <rect width="750" height="166.67" y="83.33" fill="#f1bf00"/>
    <rect width="750" height="166.67" y="250" fill="#f1bf00"/>
    <g transform="translate(125,150)">
      <rect width="100" height="200" fill="#fff" stroke="#000" strokeWidth="2"/>
      <rect width="80" height="40" x="10" y="80" fill="#aa151b"/>
      <circle cx="50" cy="100" r="15" fill="#f1bf00"/>
    </g>
  </svg>
);

// Bandera de Reino Unido
export const UKFlag: React.FC<FlagIconProps> = ({ className = '' }) => (
  <svg
    className={`flag-icon ${className}`}
    viewBox="0 0 60 30"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="60" height="30" fill="#012169"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#c8102e" strokeWidth="4"/>
    <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
    <path d="M30,0 V30 M0,15 H60" stroke="#c8102e" strokeWidth="6"/>
  </svg>
);

// Bandera de Francia
export const FranceFlag: React.FC<FlagIconProps> = ({ className = '' }) => (
  <svg
    className={`flag-icon ${className}`}
    viewBox="0 0 900 600"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="300" height="600" fill="#002654"/>
    <rect width="300" height="600" x="300" fill="#fff"/>
    <rect width="300" height="600" x="600" fill="#ce1126"/>
  </svg>
);

// Bandera de Portugal
export const PortugalFlag: React.FC<FlagIconProps> = ({ className = '' }) => (
  <svg
    className={`flag-icon ${className}`}
    viewBox="0 0 600 400"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="600" height="400" fill="#046a38"/>
    <rect width="240" height="400" fill="#d52b1e"/>
    <circle cx="240" cy="200" r="50" fill="#ffce00" stroke="#046a38" strokeWidth="4"/>
    <circle cx="240" cy="200" r="35" fill="#fff"/>
    <rect width="20" height="20" x="230" y="190" fill="#d52b1e"/>
  </svg>
);

// Componente genérico que renderiza la bandera según el código del país
interface FlagProps {
  country: string;
  className?: string;
}

export const Flag: React.FC<FlagProps> = ({ country, className = '' }) => {
  switch (country) {
    case 'es':
      return <SpainFlag className={className} />;
    case 'en':
    case 'gb':
      return <UKFlag className={className} />;
    case 'fr':
      return <FranceFlag className={className} />;
    case 'pt':
      return <PortugalFlag className={className} />;
    default:
      return null;
  }
};

export default Flag;
