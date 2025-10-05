import type { NavigationConfig } from "../Layout/DesktopNavigation";

// Configuración de idiomas (común para todas las páginas)
// IMPORTANTE: No usar Translations() aquí, se pasa como parámetro
export const getLanguageNavigation = (navigationLanguageTitle: string, navigationLanguageFlag: string): NavigationConfig => {
  return {
    key: 'idioma',
    title: navigationLanguageTitle,
    titleFlagCode: navigationLanguageFlag,
    items: [
      { 
        href: "#", 
        label: "Español", 
        flagCode: "es",
        isLanguage: true,
        languageCode: "es"
      },
      { 
        href: "#", 
        label: "English", 
        flagCode: "en",
        isLanguage: true,
        languageCode: "en"
      },
      { 
        href: "#", 
        label: "Português", 
        flagCode: "pt",
        isLanguage: true,
        languageCode: "pt"
      }
    ]
  };
};

// Configuración de vinos (común para todas las páginas)
export const getWinesNavigation = (navigationWinesTitle: string): NavigationConfig => {
  return {
    key: 'vinos',
    title: navigationWinesTitle,
    items: [
      { href: "/wines", label: "Vinos" }
    ]
  };
};