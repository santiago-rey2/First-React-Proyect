import { Footer, Header } from "../components";

const WinesPage = () => {
  return (
    <div className="wines-page">
      <section className="hero-section">
            <Header />
            <div className="menu-intro">
                <h1>NUESTROS VINOS</h1>
            </div>
        </section>
      <Footer />
    </div>
  );
};

export default WinesPage;
