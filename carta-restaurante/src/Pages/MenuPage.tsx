import { AllergenGuide, Footer, Header, MenuSection, ScrollToTop } from "../components";
import { Translations } from "../utils/Translations";
import starters from '../assets/Media/Entrante.jpg'
import seafood from '../assets/Media/Mariscos.jpg'
import salads from '../assets/Media/Ensaladas.jpg'
import meats from '../assets/Media/steak-tomahawk.webp'
import desserts from '../assets/Media/pavlova-dessert.webp'
import rice from '../assets/Media/Arroces.jpg'
import fish from '../assets/Media/Pescado.jpg'
import restuarant from '../assets/Media/interior-view.webp'
import { useQuery } from "@tanstack/react-query";
import { fetchPlatos,type Plato } from "../models";

// Datos del menú
function useMenuData() {
  const { data, error, isLoading } = useQuery<Plato[]>({
    queryKey: ["menuData"],
    queryFn: fetchPlatos,
  });

  return { data, error, isLoading };
}

function groupMenuData(data: Plato[]) {
  return {
    sugerencias: data.filter(p => p.categoria.nombre === 'Sugerencias'),
    entrantes: data.filter(p => p.categoria.nombre === 'Entrantes'),
    ensaladas: data.filter(p => p.categoria.nombre === 'Ensaladas'),
    mariscos: data.filter(p => p.categoria.nombre === 'Mariscos'),
    carnes: data.filter(p => p.categoria.nombre === 'Carnes'),
    pescados: data.filter(p => p.categoria.nombre === 'Pescados'),
    arroces: data.filter(p => p.categoria.nombre === 'Arroces'),
    postres: data.filter(p => p.categoria.nombre === 'Postres'),
  }
}

const MenuPage = () => {
  const { data, error, isLoading } = useMenuData();

  const emptyMenuData = {
  sugerencias: [],
  entrantes: [],
  ensaladas: [],
  mariscos: [],
  carnes: [],
  pescados: [],
  arroces: [],
  postres: [],
};
const menuData = data ? groupMenuData(data) : emptyMenuData;

const translations = Translations(); // <-- SIEMPRE aquí, nunca dentro de if, loops, etc. 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu data: {error.message}</div>;

  const sections = [
    {
      key: "sugerencias",
      title: translations.SECTION_SUGGESTIONS_TITLE,
      items: menuData.sugerencias,
      isSpecial: true,
      dividerImage: undefined, // No imagen por defecto
      note: undefined,
    },
    {
      key: "entrantes",
      title: translations.SECTION_STARTERS,
      items: menuData.entrantes,
      dividerImage: starters,
      note: undefined,
    },
    {
      key: "ensaladas",
      title: translations.SECTION_SALADS,
      items: menuData.ensaladas,
      dividerImage: salads,
      note: undefined,
    },
    {
      key: "mariscos",
      title: translations.SECTION_SEAFOOD,
      items: menuData.mariscos,
      dividerImage: seafood,
      note: undefined,
    },
    {
      key: "carnes",
      title: translations.SECTION_MEATS,
      items: menuData.carnes,
      dividerImage: meats,
      note: undefined,
    },
    {
      key: "pescados",
      title: translations.SECTION_FISH,
      items: menuData.pescados,
      dividerImage: fish,
      note: "Todos los pescados pueden ser elaborados al horno",
    },
    {
      key: "arroces",
      title: translations.SECTION_RICE,
      items: menuData.arroces,
      dividerImage: rice,
      note: undefined,
    },
    {
      key: "postres",
      title: translations.SECTION_DESSERTS,
      items: menuData.postres,
      dividerImage: desserts,
      note: undefined,
    },
  ];

  // Filtra solo las secciones con items
  const visibleSections = sections.filter(section => section.items.length > 0);

  return (
    <div>
      <section className="hero-section">
        <Header />
        <div className="menu-intro">
          <h1>{translations.MENU_HEADER_TITLE}</h1>
        </div>
      </section>
      <main className="main-content">
        {visibleSections.map((section, idx) => (
          <MenuSection
            key={section.key}
            title={section.title}
            items={section.items}
            //isSpecial={section.isSpecial}
            note={section.note}
            dividerImage={idx === 0 ? undefined : section.dividerImage}
            renderItem={(plato) => (
              <div className="menu-item">
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{plato.nombre}</span>
                  <span>{plato.precio} €</span>
                </div>
                <div style={{ fontSize: "0.85em", color: "#666" }}>
                  <span><b>Categoría:</b> {plato.categoria.nombre}</span>
                  {plato.descripcion && <span> &nbsp; <b>Descripción:</b> {plato.descripcion}</span>}
                </div>
              </div>
            )}
          />
        ))}
        <AllergenGuide dividerImage={restuarant} />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MenuPage;
