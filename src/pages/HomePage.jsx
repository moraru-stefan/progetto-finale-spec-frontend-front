import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-clouds" aria-hidden="true">
        <span className="home-cloud cloud-1"></span>
        <span className="home-cloud cloud-2"></span>
        <span className="home-cloud cloud-3"></span>
        <span className="home-cloud cloud-4"></span>
      </div>
      <section className="home-hero text-center">
        <p className="home-kicker mb-2">Benvenuto su SmartphoneHub</p>
        <h1 className="home-title mb-3">
          Trova il tuo prossimo smartphone
          <br />
          in modo semplice e veloce.
        </h1>
        <p className="home-subtitle mb-4">
          Esplora il catalogo, confronta i modelli e salva i preferiti:
          <br />
          tutto in un unico spazio intuitivo.
        </p>

        <div className="home-actions d-flex flex-wrap justify-content-center gap-2">
          <Link to="/smartphones" className="btn home-btn home-primary-btn">
            <i className="fa-solid fa-list me-2"></i>
            Esplora la lista
          </Link>
          <Link to="/compare" className="btn home-btn home-secondary-btn">
            <i className="fa-solid fa-scale-balanced me-2"></i>
            Inizia confronto
          </Link>
          <Link to="/favorites" className="btn home-btn home-tertiary-btn">
            <i className="fa-regular fa-heart me-2"></i>
            I miei preferiti
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
