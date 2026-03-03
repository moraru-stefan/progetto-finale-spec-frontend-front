import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

const SmartphoneDetail = ({
  favorites,
  toggleFavorite,
  compareIds,
  toggleCompare,
}) => {
  const { id } = useParams();
  const phoneId = Number(id);
  const fallbackImage = "/icon-smartphone.png";

  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!phoneId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`${API_URL}/smartphones/${phoneId}`)
      .then((res) => res.json())
      .then((data) => setPhone(data.smartphone))
      .catch((err) => {
        console.error(err);
        setPhone(null);
      })
      .finally(() => setLoading(false));
  }, [phoneId]);

  if (loading) {
    return (
      <div className="detail-page">
        <section className="detail-loading text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
          <p className="mt-3 mb-0">Caricamento dettaglio prodotto...</p>
        </section>
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="detail-page">
        <section className="detail-empty text-center">
          <i className="fa-regular fa-face-frown-open"></i>
          <h1 className="h4 mt-3">Smartphone non trovato</h1>
          <p className="text-muted mb-3">
            Il prodotto richiesto non è disponibile o non esiste più.
          </p>
          <Link to="/smartphones" className="btn detail-back-btn">
            Torna alla lista
          </Link>
        </section>
      </div>
    );
  }

  const isFavorite = favorites.includes(phone.id);
  const isInCompare = compareIds.includes(phone.id);
  const specs = [
    { label: "Categoria", value: phone.category },
    { label: "Marca", value: phone.brand },
    { label: "Prezzo", value: `${phone.price} €` },
    { label: "Sistema operativo", value: phone.os },
    { label: "Schermo", value: phone.screenSize },
    { label: "RAM", value: phone.ram },
    { label: "Memoria", value: phone.storage },
  ];

  return (
    <div className="detail-page">
      <section className="detail-hero mb-4">
        <Link className="detail-top-back" to="/smartphones">
          <i className="fa-solid fa-arrow-left me-2"></i>
          Torna alla lista
        </Link>
        <p className="detail-kicker mb-2">
          {phone.brand} • {phone.category}
        </p>
        <h1 className="detail-title mb-2">{phone.title}</h1>
        <p className="detail-price mb-0">{phone.price} €</p>
      </section>

      <div className="row g-4 align-items-stretch">
        <div className="col-12 col-lg-5">
          <article className="detail-media-card h-100">
            <div className="detail-image-wrap">
              <img
                src={phone.imageUrl || fallbackImage}
                alt={phone.title}
                className="phone-detail-img detail-image mb-0"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = fallbackImage;
                }}
              />
            </div>

            <div className="detail-actions d-grid gap-2 mt-3">
              <button
                className={`btn detail-favorite-btn ${isFavorite ? "active" : ""}`}
                onClick={() => toggleFavorite(phone.id, phone.title)}
              >
                <i className={`${isFavorite ? "fa-solid" : "fa-regular"} fa-heart me-2`}></i>
                {isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
              </button>

              <button
                className={`btn detail-compare-btn ${isInCompare ? "active" : ""}`}
                onClick={() => toggleCompare(phone.id, phone.title)}
              >
                <i className="fa-solid fa-scale-balanced me-2"></i>
                {isInCompare ? "Rimuovi dal confronto" : "Aggiungi al confronto"}
              </button>
            </div>
          </article>
        </div>

        <div className="col-12 col-lg-7">
          <article className="detail-specs-card h-100">
            <h2 className="h5 mb-3 detail-specs-title">Specifiche prodotto</h2>
            <div className="row g-3">
              {specs.map((spec) => (
                <div key={spec.label} className="col-12 col-sm-6">
                  <div className="detail-spec-item h-100">
                    <p className="detail-spec-label mb-1">{spec.label}</p>
                    <p className="detail-spec-value mb-0">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-end mt-4">
              <Link className="btn detail-list-btn" to="/smartphones">
                Continua la ricerca
              </Link>
            </div>
          </article>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SmartphoneDetail;
