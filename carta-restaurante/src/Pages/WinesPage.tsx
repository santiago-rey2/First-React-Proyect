import { Footer, Header, MenuSection, ScrollToTop, WinesItem } from "../components";
import type { NavigationConfig } from "../components/Layout/DesktopNavigation";
import { useQuery } from "@tanstack/react-query";
import { fetchVinos, type Vino, type VinosPorCategoria } from "../models";
import { useMemo } from "react";
import { getLanguageNavigation } from "../components/conf/Navigation_Configuration";
import { Translations } from "../utils/Translations";

const WinesPage = () => {
  const { data: vinos, error, isLoading } = useQuery<VinosPorCategoria>({
    queryKey: ["wines"],
    queryFn: fetchVinos,
  });

  const translations = Translations(); // ✅ Llamar hooks al nivel superior

  const navigationConfig: NavigationConfig[] = useMemo(() => {
    if (!vinos) return [];

    const vinosItems = Object.keys(vinos.vinos).map((categoria) => ({
      href: `#${categoria.toLowerCase().replace(/\s+/g, "-")}`,
      label: categoria,
    }));

    return [
      {
        key: "menu",
        title: "Menú",
        items: [{ href: "/menu", label: "Menú" }],
      },
      {
        key: "vinos",
        title: translations.NAVIGATION_WINES,
        items: [
          { href: "/wines", label: "Vinos" },
          ...vinosItems,
        ],
      },
      getLanguageNavigation(
        translations.NAVIGATION_LANGUAGE,
        translations.NAVIGATION_LANGUAGE_FLAG
      ), // ✅ Pasar traducciones
    ];
  }, [vinos, translations]); // ✅ Agregar translations a las dependencias

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu data: {error.message}</div>;
  if (!vinos) return <div>No menu data available.</div>;

  return (
    <div className="wines-page">
      <section className="hero-section">
        <Header navigationItems={navigationConfig} />
        <div className="menu-intro">
          <h1>NUESTROS VINOS</h1>
        </div>
      </section>

      <main className="main-content">
        {Object.entries(vinos.vinos).map(([categoria, denominacionesObj]) => (
          <MenuSection<[string, Vino[]]>
            key={categoria}
            title={categoria}
            sectionId={categoria.toLowerCase().replace(/\s+/g, "-")}
            items={Object.entries(denominacionesObj)}
            renderItem={([denominacion, vinos]: [string, Vino[]]) => (
              <div key={denominacion} className="wine-denomination-block">
                <h3 className="subsection-title">{denominacion}</h3>
                <div className="wines-two-column-grid">
                  {vinos.map((vino) => (
                    <WinesItem key={vino.id} item={vino} />
                  ))}
                </div>
              </div>
            )}
          />
        ))}
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default WinesPage;
