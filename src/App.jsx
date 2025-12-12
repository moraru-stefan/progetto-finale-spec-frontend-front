import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import SmartphoneList from "./pages/SmartphoneList";
import SmartphoneDetail from "./pages/SmartphoneDetail";
import ComparePage from "./pages/ComparePage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFound from "./pages/NotFound";

function App() {
  // Stato che contiene la lista degli smartphone
  const [smartphones, setSmartphones] = useState([]);

  // Stato che contiene gli ID degli smartphone preferiti
  const [favorites, setFavorites] = useState([]);
  // Funzione per aggiungere o rimuovere uno smartphone dai preferiti
  function toggleFavorite(id) {
    setFavorites((prev) =>
      // Se l'id è già nei preferiti lo rimuove, altrimenti lo aggiunge
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  }

  // Stato che contiene gli ID degli smartphone selezionati per il confronto
  const [compareIds, setCompareIds] = useState([]);
  // Funzione per aggiungere o rimuovere uno smartphone dal confronto
  function toggleCompare(id) {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        // Se l'id è già presente, lo rimuovo
        return prev.filter((cid) => cid !== id);
      }
      if (prev.length >= 2) {
        // Se ci sono già 2 smartphone, sostituisco il primo con il nuovo
        return [prev[1], id];
      }
      // Altrimenti aggiungo il nuovo id
      return [...prev, id];
    });
  }

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
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <SmartphoneList
                smartphones={smartphones}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                compareIds={compareIds}
                toggleCompare={toggleCompare}
              />
            }
          />

          <Route
            path="/smartphones/:id"
            element={
              <SmartphoneDetail
                smartphones={smartphones}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                compareIds={compareIds}
                toggleCompare={toggleCompare}
              />
            }
          />

          <Route
            path="/compare"
            element={
              <ComparePage smartphones={smartphones} compareIds={compareIds} />
            }
          />

          <Route
            path="/favorites"
            element={
              <FavoritesPage
                smartphones={smartphones}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
