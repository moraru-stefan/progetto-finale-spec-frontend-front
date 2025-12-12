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
            element={<SmartphoneList smartphones={smartphones} />}
          />
          <Route
            path="/smartphones/:id"
            element={<SmartphoneDetail smartphones={smartphones} />}
          />
          <Route
            path="/compare"
            element={<ComparePage smartphones={smartphones} />}
          />
          <Route
            path="/favorites"
            element={<FavoritesPage smartphones={smartphones} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
