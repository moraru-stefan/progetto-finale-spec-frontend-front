import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SmartphoneDetail = ({
  favorites,
  toggleFavorite,
  compareIds,
  toggleCompare,
}) => {
  // prendo l'id dalla URL /smartphones/:id
  const { id } = useParams();
  const phoneId = Number(id);

  // stato locale per il singolo smartphone
  const [phone, setPhone] = useState(null);

  // chiamata API per /smartphones/:id
  useEffect(() => {
    if (!phoneId) return;

    fetch(`http://localhost:3001/smartphones/${phoneId}`)
      .then((res) => res.json())
      .then((data) => setPhone(data.smartphone))
      .catch((err) => console.error(err));
  }, [phoneId]);

  // Se lo smartphone con l'id specificato non esiste, mostro un messaggio di errore e un link per tornare alla lista
  if (!phone) {
    return (
      <div>
        <p>Smartphone non trovato.</p>
        <Link to="/">Torna alla lista</Link>
      </div>
    );
  }

  return (
    <div>
      <img src={phone.imageUrl} alt={phone.title} className="img-fluid mb-3" />
      <h1 className="mb-3">{phone.title}</h1>

      <button
        className="btn btn-sm btn-outline-primary mb-3"
        onClick={() => toggleFavorite(phone.id)}
      >
        {favorites.includes(phone.id)
          ? "★ Tolgi dai preferiti"
          : "☆ Aggiungi ai preferiti"}
      </button>

      <button
        className="btn btn-sm btn-outline-secondary mb-3 ms-2"
        onClick={() => toggleCompare(phone.id)}
      >
        {compareIds.includes(phone.id)
          ? "Rimuovi dal confronto"
          : "Aggiungi al confronto"}
      </button>

      <div className="card">
        <div className="card-body">
          <p>
            <strong>Categoria:</strong> {phone.category}
          </p>
          <p>
            <strong>Brand:</strong> {phone.brand}
          </p>
          <p>
            <strong>Prezzo:</strong> {phone.price} €
          </p>
          <p>
            <strong>Sistema operativo:</strong> {phone.os}
          </p>
          <p>
            <strong>Schermo:</strong> {phone.screenSize}
          </p>
          <p>
            <strong>RAM:</strong> {phone.ram}
          </p>
          <p>
            <strong>Storage:</strong> {phone.storage}
          </p>
        </div>
      </div>

      <Link className="btn btn-link mt-3" to="/">
        Torna alla lista
      </Link>
    </div>
  );
};

export default SmartphoneDetail;
