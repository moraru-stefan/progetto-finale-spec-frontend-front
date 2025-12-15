import { Link } from "react-router-dom";

const FavoritesPage = ({ smartphones, favorites, toggleFavorite }) => {
  const favoritePhones = smartphones.filter((s) => favorites.includes(s.id));

 if (favoritePhones.length === 0) {
  return (
    <div>
      <h1 className="mb-3">Preferiti</h1>
      <p className="text-muted">
        Nessun preferito ancora. Aggiungi uno smartphone dalla lista principale.
      </p>
    </div>
  );
}

return (
  <div>
    <h1 className="mb-3">Preferiti</h1>

    <ul className="list-group">
      {favoritePhones.map((phone) => (
        <li
          key={phone.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <div className="fw-semibold">{phone.title}</div>
            <div className="text-muted small text-uppercase">
              {phone.category}
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => toggleFavorite(phone.id)}
            >
              Rimuovi
            </button>
            <Link
              className="btn btn-sm btn-primary"
              to={`/smartphones/${phone.id}`}
            >
              Dettagli
            </Link>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

};

export default FavoritesPage;
