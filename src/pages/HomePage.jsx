import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".home-scroll-reveal"));
    if (elements.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <div className="home-clouds" aria-hidden="true">
        <span className="home-cloud cloud-1"></span>
        <span className="home-cloud cloud-2"></span>
        <span className="home-cloud cloud-3"></span>
        <span className="home-cloud cloud-4"></span>
      </div>
      <div className="home-content">
        <section
          className="home-hero text-center home-scroll-reveal"
          style={{ "--reveal-delay": "40ms" }}
        >
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

          <div className="home-hero-badges mt-4">
            <span className="home-badge home-scroll-reveal" style={{ "--reveal-delay": "120ms" }}>
              <i className="fa-solid fa-shield-halved"></i>
              Dati protetti
            </span>
            <span className="home-badge home-scroll-reveal" style={{ "--reveal-delay": "180ms" }}>
              <i className="fa-solid fa-bolt"></i>
              Ricerca veloce
            </span>
            <span className="home-badge home-scroll-reveal" style={{ "--reveal-delay": "240ms" }}>
              <i className="fa-solid fa-star"></i>
              Esperienza premium
            </span>
          </div>
        </section>

        <section className="home-highlights home-scroll-reveal" style={{ "--reveal-delay": "30ms" }}>
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <article
                className="home-highlight-card h-100 home-scroll-reveal"
                style={{ "--reveal-delay": "80ms" }}
              >
                <span className="home-highlight-icon">
                  <i className="fa-solid fa-mobile-screen-button"></i>
                </span>
                <h2 className="home-highlight-title">Catalogo completo</h2>
                <p className="home-highlight-text mb-0">
                  Schede prodotto chiare con specifiche essenziali per scegliere piu rapidamente.
                </p>
              </article>
            </div>

            <div className="col-12 col-md-4">
              <article
                className="home-highlight-card h-100 home-scroll-reveal"
                style={{ "--reveal-delay": "150ms" }}
              >
                <span className="home-highlight-icon">
                  <i className="fa-solid fa-scale-balanced"></i>
                </span>
                <h2 className="home-highlight-title">Confronto diretto</h2>
                <p className="home-highlight-text mb-0">
                  Confronta due modelli affiancati e individua subito differenze reali.
                </p>
              </article>
            </div>

            <div className="col-12 col-md-4">
              <article
                className="home-highlight-card h-100 home-scroll-reveal"
                style={{ "--reveal-delay": "220ms" }}
              >
                <span className="home-highlight-icon">
                  <i className="fa-regular fa-heart"></i>
                </span>
                <h2 className="home-highlight-title">Wishlist personale</h2>
                <p className="home-highlight-text mb-0">
                  Salva i modelli preferiti e torna quando vuoi senza perdere le tue scelte.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="home-flow home-scroll-reveal" style={{ "--reveal-delay": "40ms" }}>
          <div className="home-section-head text-center">
            <p className="home-section-kicker mb-1">Come funziona</p>
            <h2 className="home-section-title mb-0">Dal confronto alla scelta in 3 step</h2>
          </div>

          <div className="row g-3 mt-1">
            <div className="col-12 col-md-4">
              <article
                className="home-step-card h-100 home-scroll-reveal"
                style={{ "--reveal-delay": "90ms" }}
              >
                <span className="home-step-index">01</span>
                <h3 className="home-step-title">Esplora</h3>
                <p className="home-step-text mb-0">
                  Filtra la vetrina e trova in pochi secondi i modelli piu interessanti.
                </p>
              </article>
            </div>
            <div className="col-12 col-md-4">
              <article
                className="home-step-card h-100 home-scroll-reveal"
                style={{ "--reveal-delay": "160ms" }}
              >
                <span className="home-step-index">02</span>
                <h3 className="home-step-title">Confronta</h3>
                <p className="home-step-text mb-0">
                  Metti i telefoni uno accanto all&apos;altro per valutare caratteristiche e prezzo.
                </p>
              </article>
            </div>
            <div className="col-12 col-md-4">
              <article
                className="home-step-card h-100 home-scroll-reveal"
                style={{ "--reveal-delay": "230ms" }}
              >
                <span className="home-step-index">03</span>
                <h3 className="home-step-title">Decidi</h3>
                <p className="home-step-text mb-0">
                  Salva i tuoi preferiti e torna quando vuoi per finalizzare la scelta.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="home-insights home-scroll-reveal" style={{ "--reveal-delay": "40ms" }}>
          <div className="row g-3">
            <div className="col-12 col-lg-7">
              <article
                className="home-insight-card h-100 home-scroll-reveal"
                style={{ "--reveal-delay": "110ms" }}
              >
                <h2 className="home-insight-title">Numeri della piattaforma</h2>
                <div className="home-metrics-grid">
                  <div className="home-metric">
                    <span className="home-metric-value">120+</span>
                    <span className="home-metric-label">Schede prodotto</span>
                  </div>
                  <div className="home-metric">
                    <span className="home-metric-value">35+</span>
                    <span className="home-metric-label">Brand monitorati</span>
                  </div>
                  <div className="home-metric">
                    <span className="home-metric-value">4.8/5</span>
                    <span className="home-metric-label">Valutazione media</span>
                  </div>
                </div>
              </article>
            </div>

            <div className="col-12 col-lg-5">
              <article
                className="home-insight-card h-100 home-scroll-reveal"
                style={{ "--reveal-delay": "180ms" }}
              >
                <h2 className="home-insight-title">Cosa dicono gli utenti</h2>
                <blockquote className="home-quote mb-3">
                  <p className="mb-1">
                    &quot;Finalmente un comparatore semplice: in pochi minuti ho scelto il modello
                    giusto.&quot;
                  </p>
                  <footer>- Luca, Milano</footer>
                </blockquote>
                <blockquote className="home-quote mb-0">
                  <p className="mb-1">
                    &quot;Wishlist comodissima, posso salvare i telefoni e confrontarli quando ho tempo.&quot;
                  </p>
                  <footer>- Giulia, Torino</footer>
                </blockquote>
              </article>
            </div>
          </div>
        </section>

        <section className="home-bottom-cta home-scroll-reveal" style={{ "--reveal-delay": "50ms" }}>
          <div className="home-bottom-cta-content">
            <div>
              <p className="home-bottom-kicker mb-1">Pronto a iniziare?</p>
              <h2 className="home-bottom-title mb-1">Trova oggi il tuo prossimo smartphone</h2>
              <p className="home-bottom-text mb-0">
                Parti dalla vetrina oppure confronta subito due modelli.
              </p>
            </div>
            <div className="home-bottom-actions">
              <Link to="/smartphones" className="btn home-bottom-btn primary">
                Vai alla vetrina
              </Link>
              <Link to="/compare" className="btn home-bottom-btn secondary">
                Apri confronto
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
