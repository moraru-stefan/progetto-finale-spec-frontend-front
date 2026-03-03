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
  // prendo l'id dalla URL /smartphones/:id
  const { id } = useParams();
  // converto l'id in numero
  const phoneId = Number(id);

  // stato locale per il singolo smartphone
  const [phone, setPhone] = useState(null);

  // chiamata API per /smartphones/:id
  useEffect(() => {
    // Se non c’è un id valido nella URL, non faccio la chiamata al backend
    if (!phoneId) return;

    fetch(`${API_URL}/smartphones/${phoneId}`)
      .then((res) => res.json())
      .then((data) => setPhone(data.smartphone))
      .catch((err) => console.error(err));
  }, [phoneId]);

  // Se lo smartphone con l'id specificato non esiste, mostro un messaggio di errore e un link per tornare alla lista
  if (!phone) {
    return (
      <div>
        <p>Smartphone non trovato.</p>
        <Link to="/smartphones">Torna alla lista</Link>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-10">
        <div className="row align-items-start g-4">
          {/* Colonna immagine */}
          <div className="col-12 col-md-5 text-center">
            <img
              src={phone.imageUrl}
              alt={phone.title}
              className="phone-detail-img mb-3"
            />
          </div>

          {/* Colonna testo/dettagli */}
          <div className="col-12 col-md-7">
            <h1 className="mb-3 h3">{phone.title}</h1>

            <div className="d-flex flex-wrap gap-2 mb-3">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => toggleFavorite(phone.id, phone.title)}
              >
                {favorites.includes(phone.id) ? (
                  <i className="fa-solid fa-heart"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </button>

              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => toggleCompare(phone.id, phone.title)}
              >
                {compareIds.includes(phone.id)
                  ? "Rimuovi dal confronto"
                  : "Aggiungi al confronto"}
              </button>
            </div>

            <div className="card">
              <div className="card-body">
                <p>
                  <strong>Categoria:</strong> {phone.category}
                </p>
                <p>
                  <strong>Marca:</strong> {phone.brand}
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
                  <strong>Memoria:</strong> {phone.storage}
                </p>

                <div className="d-flex">
                <Link className="btn btn-primary btn-link-home ms-auto" to="/smartphones">
                  Torna alla lista
                </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SmartphoneDetail;
