import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    // funzione asincrona che carica i dati completi
    async function loadFullPhones() {
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
        // salvo l'array completo nello stato
        setFullPhones(phones);
      } catch (err) {
        console.error("Errore nel caricamento degli smartphone completi:", err);
      }
    }
    // richiamo la funzione asincrona
    loadFullPhones();
  }, [smartphones]);

  // Estraggo tutte le categorie dagli smartphone e rimuovo i duplicati
  const categories = [];
  for (const phone of smartphones) {
    if (!categories.includes(phone.category)) {
      categories.push(phone.category);
    }
  }

  // Funzione immediatamente invocata per filtrare e ordinare gli smartphone
  const filteredSmartphones = (() => {
    // Copio dell'array originale, così non si modifica direttamente la prop
    let list = [...fullPhones];

    // Filtro per ricerca se search non è vuoto
    if (search) {
      const lower = search.toLowerCase();
      // Filtra gli smartphone il cui titolo contiene la stringa di ricerca
      list = list.filter((s) => s.title.toLowerCase().includes(lower));
    }

    // Filtro per categoria se categoryFilter non è vuoto
    if (categoryFilter) {
      list = list.filter((s) => s.category === categoryFilter);
    }

    // Ordino l'array in base al titolo
    list.sort((a, b) => {
      const titleA = a.title?.toString().toLowerCase();
      const titleB = b.title?.toString().toLowerCase();

      if (titleA < titleB) return sortDirection === "asc" ? -1 : 1;
      if (titleA > titleB) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    // Restituisce l'array filtrato e ordinato
    return list;
  })();

  return (
    <div>
      <h1 className="mb-3">Lista Telefoni</h1>

      <div className="row g-2 mb-3">
        {/* Input per ricerca per titolo */}
        <div className="col-12 col-md-4 col-lg-8">
          <input
            type="text"
            className="form-control"
            placeholder="Cerca per titolo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Select per filtro per categoria */}
        <div className="col-6 col-md-4 col-lg-2">
          <select
            className="form-select"
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

        {/* Select per ordinamento del titolo */}
        <div className="col-6 col-md-4 col-lg-2">
          <select
            className="form-select"
            value={sortDirection}
            onChange={(e) => setSortDirection(e.target.value)}
          >
            <option value="asc">Titolo A-Z</option>
            <option value="desc">Titolo Z-A</option>
          </select>
        </div>
      </div>

      {/* Lista filtrata e ordinata */}
      {filteredSmartphones.length === 0 ? (
        <p className="text-muted">Nessun risultato trovato per "{search}"</p>
      ) : (
        <div className="row g-3">
          {filteredSmartphones.map((phone) => (
            <div key={phone.id} className="col-6 col-md-4 col-lg-2">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column position-relative">
                  <button
                    className="btn-favorites btn btn-sm btn-outline-primary"
                    onClick={() => toggleFavorite(phone.id)}
                  >
                    {favorites.includes(phone.id) ? (
                      <i className="fa-solid fa-heart"></i>
                    ) : (
                      <i className="fa-regular fa-heart"></i>
                    )}
                  </button>

                  <div className="text-center">
                    <img
                      src={phone.imageUrl}
                      alt={phone.title}
                      className="phone-thumb"
                    />
                  </div>
                  <div className="mt-2 text-center">
                    <Link
                      className="btn btn-primary"
                      to={`/smartphones/${phone.id}`}
                    >
                      Dettagli
                    </Link>
                  </div>
                  <h2 className="h6 mt-2 text-center">{phone.title}</h2>
                  <p className="text-center">{phone.price} €</p>
                  <p className="text-muted mb-2 text-uppercase small">
                    {phone.category}
                  </p>
                  <div className="mt-auto d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => toggleCompare(phone.id)}
                    >
                      {compareIds.includes(phone.id)
                        ? "Rimuovi confronto"
                        : "Confronta"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SmartphoneList;
