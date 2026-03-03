import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="home-hero mb-4">
        <p className="home-kicker mb-2">Benvenuto su SmartphoneHub</p>
        <h1 className="home-title mb-3">
          Scopri, confronta e scegli lo smartphone giusto per te.
        </h1>
        <p className="home-subtitle mb-4">
          Una vetrina semplice con confronto rapido e preferiti sempre a portata di
          mano.
        </p>

        <div className="home-actions d-flex flex-wrap gap-2">
          <Link to="/smartphones" className="btn home-primary-btn">
            <i className="fa-solid fa-list me-2"></i>
            Esplora la lista
          </Link>
          <Link to="/compare" className="btn home-secondary-btn">
            <i className="fa-solid fa-scale-balanced me-2"></i>
            Inizia confronto
          </Link>
          <Link to="/favorites" className="btn home-tertiary-btn">
            <i className="fa-regular fa-heart me-2"></i>
            I miei preferiti
          </Link>
        </div>
      </section>

      <section className="row g-3 home-feature-grid">
        <div className="col-12 col-md-4">
          <article className="home-feature-card h-100">
            <div className="home-feature-icon shop-icon">
              <i className="fa-solid fa-mobile-screen-button"></i>
            </div>
            <h2 className="home-feature-title">Catalogo completo</h2>
            <p className="mb-0">
              Esplora smartphone con schede tecniche e prezzi in modo ordinato.
            </p>
          </article>
        </div>

        <div className="col-12 col-md-4">
          <article className="home-feature-card h-100">
            <div className="home-feature-icon compare-icon">
              <i className="fa-solid fa-scale-balanced"></i>
            </div>
            <h2 className="home-feature-title">Confronto chiaro</h2>
            <p className="mb-0">
              Vedi differenze su memoria, schermo, sistema operativo e prezzo.
            </p>
          </article>
        </div>

        <div className="col-12 col-md-4">
          <article className="home-feature-card h-100">
            <div className="home-feature-icon favorites-icon">
              <i className="fa-solid fa-heart"></i>
            </div>
            <h2 className="home-feature-title">Preferiti sempre pronti</h2>
            <p className="mb-0">
              Costruisci una lista personale e torna ai modelli salvati quando vuoi.
            </p>
          </article>
        </div>
      </section>
      <p className="home-footnote text-center mt-4 mb-0">
        Confronta modelli, salva i preferiti e trova il dispositivo giusto per te.
      </p>
    </div>
  );
};

export default HomePage;
