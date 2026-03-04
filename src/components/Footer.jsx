import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer" role="contentinfo">
      <div className="app-footer-inner">
        <div className="app-footer-top">
          <section className="app-footer-brand-col">
            <p className="app-footer-brand">
              <i className="fa-solid fa-mobile-screen-button" aria-hidden="true"></i>
              SmartphoneHub
            </p>
            <p className="app-footer-description">
              Confronta modelli, salva preferiti e trova il dispositivo perfetto
              in pochi click.
            </p>
          </section>

          <section className="app-footer-links-col">
            <h3 className="app-footer-heading">Navigazione</h3>
            <div className="app-footer-links">
              <Link to="/">Home</Link>
              <Link to="/smartphones">Telefoni</Link>
              <Link to="/compare">Confronta</Link>
              <Link to="/favorites">Preferiti</Link>
            </div>
          </section>

          <section className="app-footer-links-col">
            <h3 className="app-footer-heading">Contatti</h3>
            <div className="app-footer-contact">
              <p className="mb-1">support@smartphonehub.it</p>
              <p className="mb-0">Lun - Ven 9:00 - 18:00</p>
            </div>
          </section>

          <section className="app-footer-links-col">
            <h3 className="app-footer-heading">Seguici</h3>
            <div className="app-footer-social">
              <a href="#" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" aria-label="Facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="X">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </div>
          </section>
        </div>

        <div className="app-footer-bottom">
          <p className="mb-0">© {year} SmartphoneHub</p>
          <p className="mb-0">Tutti i diritti riservati</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
