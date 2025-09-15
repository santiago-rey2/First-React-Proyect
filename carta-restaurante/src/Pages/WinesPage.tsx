import { Footer, Header, MenuSection, WinesItem } from "../components";
import { useQuery } from "@tanstack/react-query";
import { fetchVinos, type Vino } from "../models";

const WinesPage = () => {
  const { data, error, isLoading } = useQuery<Vino[]>({
    queryKey: ["wines"],
    queryFn: fetchVinos,
  });

  const items = data ?? [];

  return (
    <div className="wines-page">
      <section className="hero-section">
        <Header />
        <div className="menu-intro">
          <h1>NUESTROS VINOS</h1>
        </div>
      </section>

      <main className="main-content">
        {isLoading && <p>Cargando vinos...</p>}
        {error && <p>Error: {(error as Error).message}</p>}
        {!isLoading && !error && items.length > 0 && (
          <MenuSection
            title="Vinos"
            items={items}
            renderItem={(vino) => <WinesItem item={vino} />}
          />
        )}

        {!isLoading && !error && items.length === 0 && (
          <p>No hay vinos disponibles.</p>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WinesPage;
