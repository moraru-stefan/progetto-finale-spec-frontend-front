import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

const FavoritesPage = ({
  smartphones,
  favorites,
  toggleFavorite,
  clearFavorites,
}) => {
  const [favoritePhones, setFavoritePhones] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadFavoritePhones() {
      if (favorites.length === 0) {
        setFavoritePhones([]);
        return;
      }

      setLoadingFavorites(true);
      try {
        const phones = await Promise.all(
          favorites.map(async (id) => {
            const basePhone = smartphones.find((phone) => phone.id === id);

            try {
              if (basePhone?.imageUrl) return basePhone;

              const res = await fetch(`${API_URL}/smartphones/${id}`);
              if (!res.ok) {
                throw new Error(`Errore fetch smartphone ${id}`);
              }

              const data = await res.json();
              return data.smartphone || basePhone || null;
            } catch (err) {
              console.error("Errore nel caricamento dettagli preferiti:", err);
              return basePhone || null;
            }
          })
        );

        if (!cancelled) {
          setFavoritePhones(phones.filter(Boolean));
        }
      } finally {
        if (!cancelled) {
          setLoadingFavorites(false);
        }
      }
    }

    loadFavoritePhones();
    return () => {
      cancelled = true;
    };
  }, [favorites, smartphones]);

  // Se non ci sono preferiti, mostro un messaggio
  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <section className="favorites-empty text-center">
          <i className="fa-regular fa-heart"></i>
          <h1 className="h4 mt-3">La tua wishlist è vuota</h1>
          <p className="text-muted mb-3">
            Nessun preferito ancora. Aggiungi uno smartphone dalla lista principale.
          </p>
          <Link to="/smartphones" className="btn favorites-empty-btn">
            Vai alla vetrina
          </Link>
        </section>
        <Footer />
      </div>
    );
  }

    // Se ci sono preferiti, mostro la lista
  return (
    <div className="favorites-page">
      <section className="favorites-hero mb-4">
        <div>
          <p className="favorites-kicker mb-1">Preferiti</p>
          <h1 className="h3 mb-1">I tuoi preferiti</h1>
          <p className="mb-0">{favoritePhones.length} prodotti salvati</p>
        </div>
        <button
          type="button"
          className="btn favorites-clear-btn"
          onClick={clearFavorites}
        >
          <i className="fa-regular fa-trash-can me-2"></i>
          Rimuovi tutti
        </button>
      </section>

      {loadingFavorites && favoritePhones.length === 0 ? (
        <section className="favorites-empty text-center py-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
          <p className="text-muted mb-0 mt-3">Caricamento preferiti...</p>
        </section>
      ) : null}

      <div className="row g-4">
        {favoritePhones.map((phone) => (
          <div key={phone.id} className="col-12 col-sm-6 col-lg-4">
            <article className="favorite-card h-100">
              <div className="favorite-image-wrap">
                {phone.imageUrl ? (
                  <img src={phone.imageUrl} alt={phone.title} className="phone-thumb" />
                ) : (
                  <i className="fa-solid fa-mobile-screen-button"></i>
                )}
              </div>

              <div className="favorite-card-body">
                <p className="favorite-category">{phone.category || "Smartphone"}</p>
                <h2 className="favorite-title">{phone.title}</h2>
                {phone.price ? <p className="favorite-price">{phone.price} €</p> : null}
              </div>

              <div className="d-grid gap-2">
                <Link className="btn favorite-detail-btn" to={`/smartphones/${phone.id}`}>
                  Vedi dettagli
                </Link>
                <button
                  className="btn favorite-remove-btn"
                  onClick={() => toggleFavorite(phone.id, phone.title)}
                >
                  Rimuovi dai preferiti
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default FavoritesPage;
