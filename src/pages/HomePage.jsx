import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="text-center px-4">
        <div className="mb-5">
          <i className="fa-solid fa-mobile-retro fa-5x text-primary mb-4"></i>
          <h1 className="display-4 fw-bold mb-3">SmartphoneHub</h1>
          <p className="lead text-muted mb-4">
            Scopri, confronta e trova lo smartphone perfetto per te
          </p>
        </div>

        <Link 
          to="/smartphones" 
          className="btn btn-primary btn-lg px-5 py-3"
        >
          <i className="fa-solid fa-list me-2"></i>
          Esplora la lista
        </Link>

        <div className="mt-5">
          <small className="text-muted">
            Confronta modelli • Salva preferiti • Dettagli completi
          </small>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
