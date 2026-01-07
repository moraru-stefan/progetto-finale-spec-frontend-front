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
      // Converto la stringa di ricerca in minuscolo per confronto case-insensitive
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
                    // All' onClick richiamo funzione toggleFavorite
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
