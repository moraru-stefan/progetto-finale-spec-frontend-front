
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const SmartphoneDetail = ({ smartphones }) => {
    
  // prendo l'id dalla URL /smartphones/:id
  const { id } = useParams();
  const phoneId = Number(id);

  // cerco nello stesso array passato da App
  const phone = smartphones.find((s) => s.id === phoneId);

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
      <h1 className="mb-3">{phone.title}</h1>

      <div className="card">
        <div className="card-body">
          <p><strong>Categoria:</strong> {phone.category}</p>
          <p><strong>Brand:</strong> {phone.brand}</p>
          <p><strong>Prezzo:</strong> {phone.price} €</p>
          <p><strong>Sistema operativo:</strong> {phone.os}</p>
          <p><strong>Schermo:</strong> {phone.screenSize}</p>
          <p><strong>RAM:</strong> {phone.ram}</p>
          <p><strong>Storage:</strong> {phone.storage}</p>
        </div>
      </div>

      <Link className="btn btn-link mt-3" to="/">
        Torna alla lista
      </Link>
    </div>
  );
};

export default SmartphoneDetail;
