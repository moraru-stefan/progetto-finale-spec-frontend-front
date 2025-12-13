import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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
    if (!smartphones.length) return;

    Promise.all(
      smartphones.map((s) =>
        fetch(`http://localhost:3001/smartphones/${s.id}`)
          .then((res) => res.json())
          .then((data) => data.smartphone)
      )
    )
      .then(setFullPhones)
      .catch((err) => console.error(err));
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
      <h1 className="mb-3">Lista Smartphone</h1>

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

                {/* immagine in alto */}
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
    </div>
  );
};

export default SmartphoneList;
