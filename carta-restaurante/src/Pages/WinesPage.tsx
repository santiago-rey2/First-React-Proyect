import { Footer, Header, MenuSection } from "../components";
import { useQuery } from "@tanstack/react-query";
import { fetchVinos, type Vino } from "../models";

const WinesPage = () => {
  const { data, error, isLoading } = useQuery<Vino[]>({
    queryKey: ["wines"],
    queryFn: fetchVinos,
  });

  // Si el componente MenuSection espera ciertas claves, puedes transformar aquí:
  // const items = (data ?? []).map(v => ({ ...v, nombre: v.nombre, precio: v.precio }));
  const items = data ?? [];

  return (
    <div className="wines-page">
      <section className="hero-section">
        <Header />
        <div className="menu-intro">
          <h1>VINOS</h1>
        </div>
      </section>

      <main className="main-content">
        {isLoading && <p>Cargando vinos...</p>}
        {error && <p>Error: {(error as Error).message}</p>}
        {!isLoading && !error && items.length > 0 && (
          <MenuSection
            title="Vinos"
            items={items}
            isSpecial={false}
            note={undefined}
            dividerImage={undefined}
          />
        )}

        {!isLoading && !error && items.length === 0 && (
          <p>No hay vinos disponibles.</p>
        )}

        {/* Debug opcional: 
        <pre style={{ fontSize: ".7rem", opacity: .6 }}>{JSON.stringify(items, null, 2)}</pre>
        */}
      </main>

      <Footer />
    </div>
  );
};

export default WinesPage;
