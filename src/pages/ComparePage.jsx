import { useEffect, useState } from "react";

const ComparePage = ({ compareIds }) => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    if (compareIds.length < 2) return;

    Promise.all(
      compareIds.map((id) =>
        fetch(`http://localhost:3001/smartphones/${id}`)
          .then((res) => res.json())
          .then((data) => data.smartphone)
      )
    ).then(setPhones);
  }, [compareIds]);

  if (phones.length < 2) {
    return <p>Seleziona almeno 2 smartphone per confrontarli.</p>;
  }

  // Estraggo i due smartphone selezionati
  const [first, second] = phones;

  return (
    <div>
      <h1 className="mb-3">Confronto Smartphone</h1>

      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h2 className="h4">{first.title}</h2>
              {/* Colonna immagine */}
              <div className="col-12 col-md-5 text-center">
                <img
                  src={first.imageUrl}
                  alt={first.title}
                  className="phone-detail-img mb-3"
                />
              </div>
              <p>
                <strong>Categoria:</strong> {first.category}
              </p>
              <p>
                <strong>Marca:</strong> {first.brand}
              </p>
              <p>
                <strong>Prezzo:</strong> {first.price} €
              </p>
              <p>
                <strong>Sistema operativo:</strong> {first.os}
              </p>
              <p>
                <strong>Schermo:</strong> {first.screenSize}
              </p>
              <p>
                <strong>RAM:</strong> {first.ram}
              </p>
              <p>
                <strong>Memoria:</strong> {first.storage}
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h2 className="h4">{second.title}</h2>
              {/* Colonna immagine */}
              <div className="col-12 col-md-5 text-center">
                <img
                  src={second.imageUrl}
                  alt={second.title}
                  className="phone-detail-img mb-3"
                />
              </div>
              <p>
                <strong>Categoria:</strong> {second.category}
              </p>
              <p>
                <strong>Marca:</strong> {second.brand}
              </p>
              <p>
                <strong>Prezzo:</strong> {second.price} €
              </p>
              <p>
                <strong>Sistema operativo:</strong> {second.os}
              </p>
              <p>
                <strong>Schermo:</strong> {second.screenSize}
              </p>
              <p>
                <strong>RAM:</strong> {second.ram}
              </p>
              <p>
                <strong>Memoria:</strong> {second.storage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
