import { useState, useEffect } from "react";

function App() {
  // Stato che contiene la lista degli smartphone
  const [smatphones, setSmartphones] = useState([]);

  useEffect(() => {
    // Recupero dei dati dal backend all'avvio dell'app
    fetch("http://localhost:3001/smartphones")
      // Converto la risposta in JSON
      .then((res) => res.json())
      // Salvo i dati nello stato
      .then((data) => setSmartphones(data))
      // Gestione errori
      .catch((err) => console.error("Errore nel fetch:", err));
  }, []);

  return (
    <div>
      <h1>Lista Smartphone</h1>
      <ul>
        {/* Ciclo sugli smartphone e li mostro nella lista */}
        {smatphones.map((smatphone) => {
          return (
            <li key={smatphone.id}>
              {smatphone.title} - {smatphone.category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
