import { AllergenGuide, Footer, Header, MenuItem, MenuSection, ScrollToTop } from "../components";
import type { NavigationConfig } from "../components/Layout/DesktopNavigation";
import { Translations } from "../utils/Translations";
import { useQuery } from "@tanstack/react-query";
import { fetchPlatos, type Menu, type Plato } from "../models";
import { ASSETS } from "../components/conf";
import { useMemo } from "react";
import { getLanguageNavigation, getWinesNavigation } from "../components/conf/Navigation_Configuration";
import {WaveLoader} from "../components/UI";

function useMenuData() {
  const { data, error, isLoading } = useQuery<Menu>({
    queryKey: ["menuData"],
    queryFn: fetchPlatos,
  });

  return { data, error, isLoading };
}

const MenuPage = () => {
  const { data: menu, error, isLoading } = useMenuData();
  const translations = Translations(); // ✅ Llamar hooks al nivel superior

  // Generar navigation config dinámicamente basado en los platos
  const navigationConfig: NavigationConfig[] = useMemo(() => {
    if (!menu) return [];

    // Generar items dinámicamente desde las categorías de platos
    const platosItems = Object.keys(menu.platos)
      .filter(categoria => categoria !== 'sugerencias')
      .map(categoria => ({
        href: `#${categoria.toLowerCase().replace(/\s+/g, '-')}`,
        label: translations[`MENU_SECTION_${categoria.toUpperCase()}` as keyof typeof translations] || categoria
      }));

    // Agregar "Menú" y "Sugerencias" al principio si existen
    const menuItems = [
      { href: "/menu", label: "Menú" },
      ...(menu.platos['sugerencias'] ? [{ href: "#sugerencias-del-dia", label: "Sugerencias del Día" }] : []),
      ...platosItems
    ];

    return [
      {
        key: 'platos',
        title: translations.NAVIGATION_HOME,
        items: menuItems
      },
      getWinesNavigation(translations.NAVIGATION_WINES), // ✅ Pasar traducciones como parámetro
      {
        key : 'alergenos',
        title: translations.SECTION_ALLERGENS,
        items: [{ href: "#allergens", label: translations.SECTION_ALLERGENS }]
      },
      getLanguageNavigation(translations.NAVIGATION_LANGUAGE, translations.NAVIGATION_LANGUAGE_FLAG) // ✅ Pasar traducciones
    ];
  }, [menu, translations]); // ✅ Agregar translations a las dependencias
  
  const getSectionImage = (seccion: string, index: number, hasSugerencias: boolean): string | undefined => {
    if (index === 0 && !hasSugerencias) {
      return undefined;
    }

    const imageMap: Record<string, string> = {
      'entrantes': ASSETS.STARTERS,
      'mariscos': ASSETS.SEAFOOD,
      'ensaladas': ASSETS.SALADS,
      'carnes': ASSETS.MEATS,
      'arroces': ASSETS.RICE,
      'pescados': ASSETS.FISH,
      'postres': ASSETS.DESSERTS,
      'principales': ASSETS.MEATS
    };

    return imageMap[seccion.toLowerCase()];
  };

  if (isLoading) return <WaveLoader />;
  if (error) return <div>Error loading menu data: {error.message}</div>;
  if (!menu) return <div>No menu data available.</div>;

  const hasSugerencias = menu.platos['sugerencias'] && menu.platos['sugerencias'].length > 0;

  return (
    <div>
      <section className="hero-section">
        <Header navigationItems={navigationConfig} />
        <div className="menu-intro">
          <h1>{translations.MENU_HEADER_TITLE}</h1>
        </div>
      </section>
      <main className="main-content">
        <div>
          {hasSugerencias && (
            <MenuSection<Plato>
              title={translations.SECTION_SUGGESTIONS_TITLE}
              sectionId="sugerencias-del-dia"
              items={menu.platos['sugerencias']}
              isSpecial={true}
              renderItem={(plato) => <MenuItem item={plato} />}
            />
          )}
          
          {Object.entries(menu.platos)
            .filter(([seccion]) => seccion !== 'sugerencias')
            .map(([seccion, platos], index) => (
              <MenuSection<Plato>
                key={seccion}
                sectionId={seccion.toLowerCase().replace(/\s+/g, '-')}
                title={translations[`MENU_SECTION_${seccion.toUpperCase()}` as keyof typeof translations] || seccion}
                items={platos}
                dividerImage={getSectionImage(seccion, index, hasSugerencias)}
                renderItem={(plato) => <MenuItem item={plato} />}
              />
            ))}
        </div>
      </main>
      <AllergenGuide />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MenuPage;
