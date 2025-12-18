import { useEffect, useState } from "react";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;


const ComparePage = ({ compareIds }) => {
  const [phones, setPhones] = useState([]);

useEffect(() => {
  if (compareIds.length < 2) return;

  async function loadPhones() {
    try {
      const loaded = [];

      for (const id of compareIds) {
        const res = await fetch(`${API_URL}/smartphones/${id}`);
        const data = await res.json();
        loaded.push(data.smartphone);
      }

      setPhones(loaded);
    } catch (err) {
      console.error("Errore nel caricamento degli smartphone da confrontare:", err);
    }
  }

  loadPhones();
}, [compareIds]);

 if (phones.length < 2) {
    return (
    <div>
      <h1 className="mb-3">Confronta</h1>
      <p className="text-muted">
        Seleziona almeno 2 smartphone dalla lista per visualizzare il confronto.
      </p>
    </div>
  );
}


  // Estraggo i due smartphone selezionati
  const [first, second] = phones;

return (
  <div className="row justify-content-center">
    <div className="col-12 col-lg-10">
      <h1 className="mb-3 h4 text-center">Confronto Smartphone</h1>

      <div className="card-compare-container row g-3 align-items-start">
        {[first, second].map((phone) => (
          <div key={phone.id} className="col-6 col-md-6">
            <div className="card shadow-sm">
              <div className="text-center pt-3">
                <img
                  src={phone.imageUrl}
                  alt={phone.title}
                  className="phone-detail-img mb-2"
                />
              </div>
              <div className="card-body py-3">
                <h2 className="h6 mb-2 text-center">{phone.title}</h2>

                <p className="mb-1">
                  <strong>Categoria:</strong> {phone.category}
                </p>
                <p className="mb-1">
                  <strong>Marca:</strong> {phone.brand}
                </p>
                <p className="mb-1">
                  <strong>Prezzo:</strong> {phone.price} €
                </p>
                <p className="mb-1">
                  <strong>Sistema operativo:</strong> {phone.os}
                </p>
                <p className="mb-1">
                  <strong>Schermo:</strong> {phone.screenSize}
                </p>
                <p className="mb-1">
                  <strong>RAM:</strong> {phone.ram}
                </p>
                <p className="mb-0">
                  <strong>Memoria:</strong> {phone.storage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
  </div>
);

};

export default ComparePage;
