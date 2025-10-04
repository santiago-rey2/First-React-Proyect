import { Footer, Header, MenuSection, ScrollToTop, WinesItem } from "../components";
import { useQuery } from "@tanstack/react-query";
import { fetchVinos, type Vino, type VinosPorCategoria } from "../models";

const WinesPage = () => {
  const { data:vinos, error, isLoading } = useQuery<VinosPorCategoria>({
    queryKey: ["wines"],
    queryFn: fetchVinos,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu data: {error.message}</div>;
  if (!vinos) return <div>No menu data available.</div>;

  return (
    <div className="wines-page">
      <section className="hero-section">
        <Header />
        <div className="menu-intro">
          <h1>NUESTROS VINOS</h1>
        </div>
      </section>

      <main className="main-content">
        {Object.entries(vinos.vinos).map(([categoria, denominacionesObj]) => (
          <MenuSection<[string, Vino[]]>
            key={categoria}
            title={categoria}
            items={Object.entries(denominacionesObj)}
            renderItem={([denominacion, vinos]: [string, Vino[]]) => (
              <div key={denominacion} className="wine-denomination-block">
                <h3 className="subsection-title">{denominacion}</h3>
                <div className="wines-two-column-grid">
                  {vinos.map((vino) => (
                    <WinesItem
                      key={vino.id}
                      item={vino}
                    />
                  ))}
                </div>
              </div>
            )}
          />
        ))}
      </main>

      <Footer />
      <ScrollToTop/>
    </div>
  );
};

export default WinesPage;
