import { Link } from "react-router-dom";

const FavoritesPage = ({ smartphones, favorites, toggleFavorite }) => {
  const favoritePhones = smartphones.filter((s) => favorites.includes(s.id));

  if (favoritePhones.length === 0) {
    return <p>Nessun preferito ancora.</p>;
  }

  return (
    <div>
      <h1 className="mb-3">Preferiti</h1>
      <ul>
        {favoritePhones.map((phone) => (
          <li key={phone.id}>
            {phone.title} - {phone.category}{" "}
            <button
              className="btn btn-sm btn-outline-danger me-2"
              onClick={() => toggleFavorite(phone.id)}
            >
              Rimuovi
            </button>
            <Link to={`/smartphones/${phone.id}`}>Dettagli</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
