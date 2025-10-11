/**
 * Obtiene el idioma del navegador y lo mapea a los idiomas soportados
 * @returns 'es' | 'en' | 'pt'
 */
export const getBrowserLanguage = (): string => {
  // Obtener el idioma del navegador
  const browserLang = navigator.language || navigator.languages?.[0] || 'es';
  
  console.log(`🌐 Idioma del navegador detectado: ${browserLang}`);
  
  // Extraer solo el código del idioma (ej: 'es-ES' -> 'es')
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  // Mapear a idiomas soportados
  const supportedLanguages = ['es', 'en', 'pt'];
  
  if (supportedLanguages.includes(langCode)) {
    return langCode;
  }
  
  // Si no está soportado, usar español por defecto
  return 'es';
};

/**
 * Obtiene el idioma preferido del usuario con prioridad:
 * 1. localStorage (preferencia guardada)
 * 2. Navegador
 * 3. Español por defecto
 */
export const getPreferredLanguage = (): string => {
  // 1. Verificar si hay preferencia guardada
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang) {
    return savedLang;
  }
  
  // 2. Obtener del navegador
  const browserLang = getBrowserLanguage();
  
  // 3. Guardar la preferencia detectada
  localStorage.setItem('preferredLanguage', browserLang);
  
  return browserLang;
};