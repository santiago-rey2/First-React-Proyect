import { AllergenGuide, Footer, Header, MenuItem, MenuSection, ScrollToTop } from "../components";
import { Translations } from "../utils/Translations";
import starters from '../assets/Media/Entrante.jpg'
import seafood from '../assets/Media/Mariscos.jpg'
import salads from '../assets/Media/Ensaladas.jpg'
import meats from '../assets/Media/steak-tomahawk.webp'
import desserts from '../assets/Media/pavlova-dessert.webp'
import rice from '../assets/Media/Arroces.jpg'
import fish from '../assets/Media/Pescado.jpg'
import { useQuery } from "@tanstack/react-query";
import { fetchPlatos,type Menu,type Plato } from "../models";

// Datos del menú
function useMenuData() {
  const { data, error, isLoading } = useQuery<Menu>({
    queryKey: ["menuData"],
    queryFn: fetchPlatos,
  });

  return { data, error, isLoading };
}

const MenuPage = () => {
  const { data:menu, error, isLoading } = useMenuData();
  const translations = Translations();
  
  // Función para obtener la imagen de la sección
  const getSectionImage = (seccion: string, index: number, hasSugerencias: boolean): string | undefined => {
    // Si es la primera sección y no hay sugerencias, no aplicar imagen
    if (index === 0 && !hasSugerencias) {
      return undefined;
    }

    const imageMap: Record<string, string> = {
      'entrantes': starters,
      'mariscos': seafood,
      'ensaladas': salads,
      'carnes': meats,
      'arroces': rice,
      'pescados': fish,
      'postres': desserts,
      'principales': meats
    };

    return imageMap[seccion.toLowerCase()];
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu data: {error.message}</div>;
  if (!menu) return <div>No menu data available.</div>;

  // Verificar si hay sugerencias
  const hasSugerencias = menu.platos['sugerencias'] && menu.platos['sugerencias'].length > 0;

  return (
    <div>
      <section className="hero-section">
        <Header />
        <div className="menu-intro">
          <h1>{translations.MENU_HEADER_TITLE}</h1>
        </div>
      </section>
      <main className="main-content">
        <div>
          {/* Renderizar sugerencias solo si existen */}
          {hasSugerencias && (
            <MenuSection<Plato>
              title={translations.SECTION_SUGGESTIONS_TITLE}
              items={menu.platos['sugerencias']}
              isSpecial={true}
              renderItem={(plato) => (
                <MenuItem 
                  item={plato}
                />
              )}
            />
          )}
          
          {Object.entries(menu.platos)
            .filter(([seccion]) => seccion !== 'sugerencias') // Excluir sugerencias del mapeo principal
            .map(([seccion, platos], index) => (
            <MenuSection<Plato>
              key={seccion}
              title={translations[`MENU_SECTION_${seccion.toUpperCase()}` as keyof typeof translations] || seccion}
              items={platos}
              dividerImage={getSectionImage(seccion, index, hasSugerencias)}
              renderItem={(plato) => (
                <MenuItem 
                  item={plato}
                />
              )}
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
