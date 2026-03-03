import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

const SmartphoneList = ({
  smartphones,
  favorites,
  toggleFavorite,
  compareIds,
  toggleCompare,
}) => {
  // Stato per la stringa di ricerca inserita dall'utente
  const [search, setSearch] = useState("");
  // Stato per il filtro per categoria selezionata dall'utente
  const [categoryFilter, setCategoryFilter] = useState("");
  // Stato per la direzione dell'ordinamento (default crescente "asc")
  const [sortDirection, setSortDirection] = useState("asc");

  // Smartphone completi (con imageUrl, brand, ecc.)
  const [fullPhones, setFullPhones] = useState([]);

  const [loading, setLoading] = useState(smartphones.length === 0);

  useEffect(() => {
    if (!smartphones || smartphones.length === 0) return;
    // funzione asincrona che carica i dati completi
    async function loadFullPhones() {
      setLoading(true);
      try {
        // array temporaneo dove salvo gli smartphone completi
        const phones = [];
        // per ogni smartphone faccio una chiamata al backend
        for (const s of smartphones) {
          const res = await fetch(`${API_URL}/smartphones/${s.id}`);
          // converto la risposta in JSON
          const data = await res.json();
          // aggiungo lo smartphone completo all'array
          phones.push(data.smartphone);
        }

          await new Promise((resolve) => setTimeout(resolve, 500));

        // salvo l'array completo nello stato
        setFullPhones(phones);
      } catch (err) {
        console.error("Errore nel caricamento degli smartphone completi:", err);
      } finally {
      setLoading(false); 
    }
    }
    // richiamo la funzione asincrona
     loadFullPhones();
    // Esegue l'effetto ogni volta che cambia la lista degli smartphone passata come prop.
  }, [smartphones]);

  // Estraggo tutte le categorie dagli smartphone e rimuovo i duplicati
  const categories = [];
  // Ciclo tutti gli smartphone ricevuti come prop
  for (const phone of smartphones) {
    // Se la categoria di questo smartphone NON è già presente nell'array (per evitare duplicati)
    if (!categories.includes(phone.category)) {
      // Aggiungo la categoria all'array
      categories.push(phone.category);
    }
  }

  // Funzione useMemo memorizza il risultato del calcolo e lo ricalcola solo quando cambiano le dipendenze specificate
  const filteredSmartphones = useMemo(() => {
    // Copia dell'array originale, così non si modifica direttamente lo stato originale
    let list = [...fullPhones];

    // Se l'utente ha scritto qualcosa nel campo di ricerca
    if (search) {
      // Converto la stringa di ricerca in minuscolo 
      const lower = search.toLowerCase(); 
      // Filtro la lista mantenendo solo gli smartphone il cui titolo contiene la stringa di ricerca
      list = list.filter((s) => s.title.toLowerCase().includes(lower));
    }

    // Se l'utente ha selezionato una categoria
    if (categoryFilter) {
      // Filtro la lista mantenendo solo gli smartphone della categoria selezionata
      list = list.filter((s) => s.category === categoryFilter);
    }

    // Ordino l'array in base al titolo
    list.sort((a, b) => {
      // Prendo il titolo del primo elemento, lo converto in stringa e in minuscolo
      const titleA = a.title.toString().toLowerCase();
      // Prendo il titolo del secondo elemento, lo converto in stringa e in minuscolo
      const titleB = b.title.toString().toLowerCase();

      // Se A viene prima di B nell'alfabeto, A va prima o dopo in base al tipo di ordinamento
      if (titleA < titleB) return sortDirection === "asc" ? -1 : 1;
      // Se A viene dopo B nell'alfabeto, Inverto l'ordine se l'ordinamento è decrescente
      if (titleA > titleB) return sortDirection === "asc" ? 1 : -1;
      // Se i due titoli sono uguali, ritorno 0
      return 0;
    });

    // Ritorno l'array filtrato e ordinato
    return list;
  }, [fullPhones, search, categoryFilter, sortDirection]);

  return (
    <div className="shop-page">
      <section className="shop-hero mb-0">
        <div className="shop-hero-content">
          <p className="shop-kicker mb-2">SmartphoneHub Store</p>
          <h1 className="shop-title-main">Scopri il prossimo smartphone perfetto</h1>
          <p className="shop-subtitle mb-0">
            Offerte, confronto rapido e dettagli completi in una sola vetrina.
          </p>
        </div>
        <div className="shop-hero-stats">
          <div className="shop-stat">
            <span className="shop-stat-value">
              {(fullPhones.length || smartphones.length).toString()}
            </span>
            <span className="shop-stat-label">Prodotti</span>
          </div>
          <div className="shop-stat">
            <span className="shop-stat-value">{categories.length}</span>
            <span className="shop-stat-label">Categorie</span>
          </div>
          <div className="shop-stat">
            <span className="shop-stat-value">{favorites.length}</span>
            <span className="shop-stat-label">Preferiti</span>
          </div>
        </div>
      </section>

      <section className="shop-filter-panel mb-0">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-lg-6">
            <label className="shop-filter-label">Cerca modello</label>
            <div className="shop-input-wrap">
              <input
                type="text"
                className="form-control shop-input"
                placeholder="Es. Galaxy, iPhone, Pixel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <label className="shop-filter-label">Categoria</label>
            <select
              className="form-select shop-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Tutte le categorie</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6 col-lg-3">
            <label className="shop-filter-label">Ordina</label>
            <select
              className="form-select shop-select"
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value)}
            >
              <option value="asc">Titolo A-Z</option>
              <option value="desc">Titolo Z-A</option>
            </select>
          </div>
        </div>
        <p className="shop-results mb-0 mt-3">
          {loading ? "Caricamento prodotti..." : `${filteredSmartphones.length} prodotti trovati`}
        </p>
      </section>

      {loading ? (
        <div className="shop-loading text-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
          <p className="mt-3 mb-0">
            Caricamento dati in corso, potrebbe richiedere qualche istante.
          </p>
        </div>
      ) : filteredSmartphones.length === 0 ? (
        <div className="shop-empty-state text-center">
          <i className="fa-regular fa-face-frown-open mb-3"></i>
          <p className="mb-1">Nessun risultato trovato per "{search}"</p>
          <small>Prova a cambiare ricerca o categoria.</small>
        </div>
      ) : (
        <div className="row g-0 shop-products-row">
          {filteredSmartphones.map((phone) => {
            const isFavorite = favorites.includes(phone.id);
            const isInCompare = compareIds.includes(phone.id);

            return (
              <div key={phone.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <article className="shop-card h-100">
                  <button
                    className={`shop-favorite-btn ${isFavorite ? "active" : ""}`}
                    onClick={() => toggleFavorite(phone.id, phone.title)}
                    aria-label={
                      isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"
                    }
                  >
                    {isFavorite ? (
                      <i className="fa-solid fa-heart"></i>
                    ) : (
                      <i className="fa-regular fa-heart"></i>
                    )}
                  </button>

                  <p className="shop-category">{phone.category}</p>

                  <Link className="shop-image-wrap" to={`/smartphones/${phone.id}`}>
                    <img src={phone.imageUrl} alt={phone.title} className="phone-thumb" />
                  </Link>

                  <div className="shop-card-body">
                    <h2 className="shop-card-title">{phone.title}</h2>
                    <p className="shop-price mb-3">{phone.price} €</p>

                    <div className="d-grid gap-2">
                      <Link className="btn shop-detail-btn" to={`/smartphones/${phone.id}`}>
                        Dettagli prodotto
                      </Link>
                      <button
                        className={`btn btn-sm shop-compare-btn ${isInCompare ? "active" : ""}`}
                        onClick={() => toggleCompare(phone.id, phone.title)}
                      >
                        {isInCompare ? "Rimuovi confronto" : "Aggiungi al confronto"}
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SmartphoneList;
