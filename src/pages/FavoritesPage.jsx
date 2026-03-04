import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [phoneToRemove, setPhoneToRemove] = useState(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);

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

  useEffect(() => {
    if (!phoneToRemove && !showClearAllConfirm) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setPhoneToRemove(null);
        setShowClearAllConfirm(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [phoneToRemove, showClearAllConfirm]);

  function askRemoveFavorite(phone) {
    setShowClearAllConfirm(false);
    setPhoneToRemove(phone);
  }

  function confirmRemoveFavorite() {
    if (!phoneToRemove) return;
    const targetPhone = phoneToRemove;
    setPhoneToRemove(null);
    toggleFavorite(targetPhone.id, targetPhone.title);
  }

  function askClearAllFavorites() {
    setPhoneToRemove(null);
    setShowClearAllConfirm(true);
  }

  function confirmClearAllFavorites() {
    setShowClearAllConfirm(false);
    clearFavorites();
  }

  const confirmDialog = phoneToRemove
    ? createPortal(
      <div
        className="compare-confirm-backdrop"
        onClick={() => setPhoneToRemove(null)}
        role="presentation"
      >
        <div
          className="compare-confirm-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="favoriteConfirmTitle"
          onClick={(event) => event.stopPropagation()}
        >
          <p className="compare-confirm-kicker mb-2">Conferma azione</p>
          <h2 id="favoriteConfirmTitle" className="h5 mb-2">
            Rimuovere dai preferiti?
          </h2>
          <p className="mb-3 compare-confirm-text">
            Vuoi rimuovere <strong>"{phoneToRemove.title}"</strong> dalla lista preferiti?
          </p>

          <div className="compare-confirm-actions">
            <button
              type="button"
              className="btn compare-confirm-cancel"
              onClick={() => setPhoneToRemove(null)}
            >
              Annulla
            </button>
            <button
              type="button"
              className="btn compare-confirm-remove"
              onClick={confirmRemoveFavorite}
            >
              Rimuovi
            </button>
          </div>
        </div>
      </div>,
      document.body
    )
    : showClearAllConfirm
      ? createPortal(
        <div
          className="compare-confirm-backdrop"
          onClick={() => setShowClearAllConfirm(false)}
          role="presentation"
        >
          <div
            className="compare-confirm-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="favoritesClearAllTitle"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="compare-confirm-kicker mb-2">Conferma azione</p>
            <h2 id="favoritesClearAllTitle" className="h5 mb-2">
              Rimuovere tutti i preferiti?
            </h2>
            <p className="mb-3 compare-confirm-text">
              Vuoi rimuovere tutti gli smartphone dalla lista preferiti?
            </p>

            <div className="compare-confirm-actions">
              <button
                type="button"
                className="btn compare-confirm-cancel"
                onClick={() => setShowClearAllConfirm(false)}
              >
                Annulla
              </button>
              <button
                type="button"
                className="btn compare-confirm-remove"
                onClick={confirmClearAllFavorites}
              >
                Rimuovi tutti
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

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
          onClick={askClearAllFavorites}
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

      <div className="row g-0">
        {favoritePhones.map((phone) => (
          <div key={phone.id} className="col-12 col-sm-6 col-lg-4">
            <article className="favorite-card h-100">
              <button
                type="button"
                className="btn compare-remove-btn favorite-remove-icon-btn"
                onClick={() => askRemoveFavorite(phone)}
                aria-label={`Rimuovi ${phone.title} dai preferiti`}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
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
              </div>
            </article>
          </div>
        ))}
      </div>
      {confirmDialog}
      <Footer />
    </div>
  );
};

export default FavoritesPage;
