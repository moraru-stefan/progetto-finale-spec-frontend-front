import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Layout from "./layout/Layout";
import SmartphoneList from "./pages/SmartphoneList";
import SmartphoneDetail from "./pages/SmartphoneDetail";
import ComparePage from "./pages/ComparePage";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  // Stato che contiene la lista degli smartphone
  const [smartphones, setSmartphones] = useState([]);
  const [toasts, setToasts] = useState([]);
  const toastTimeoutsRef = useRef(new Map());

  useEffect(() => {
    const timeoutMap = toastTimeoutsRef.current;
    return () => {
      timeoutMap.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutMap.clear();
    };
  }, []);

  function removeToast(toastId) {
    const timeoutId = toastTimeoutsRef.current.get(toastId);
    if (timeoutId) {
      clearTimeout(timeoutId);
      toastTimeoutsRef.current.delete(toastId);
    }
    setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
  }

  function showToast(message, type = "info") {
    const toastId = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id: toastId, message, type }]);

    const timeoutId = setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
      toastTimeoutsRef.current.delete(toastId);
    }, 2600);

    toastTimeoutsRef.current.set(toastId, timeoutId);
  }

  
  // Stato che contiene gli ID degli smartphone preferiti
  const [favorites, setFavorites] = useState(() => {
    // Recupero dal localStorage il valore salvato con chiave "favorites"
    const saved = localStorage.getItem("favorites");
    // Se esistono, li converto in array, altrimenti array vuoto
    return saved ? JSON.parse(saved) : [];
  });

  // Salvo i preferiti nel localStorage ogni volta che cambiano
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Funzione per aggiungere o rimuovere uno smartphone dai preferiti
  function toggleFavorite(id, title = "") {
    const isAlreadyFavorite = favorites.includes(id);
    const productName =
      title || smartphones.find((phone) => phone.id === id)?.title || "Prodotto";

    //Prendo l'id dello smartphone cliccato
    setFavorites((prev) =>
      //Controllo, se l'id è già nei preferiti lo rimuovo, altrimenti lo aggiungo
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );

    showToast(
      isAlreadyFavorite
        ? `"${productName}" rimosso dai preferiti`
        : `"${productName}" aggiunto ai preferiti`,
      isAlreadyFavorite ? "neutral" : "favorite"
    );
  }
  
  // Funzione per svuotare tutti i preferiti
  function clearFavorites() {
    if (favorites.length === 0) return;
    setFavorites([]);
    showToast("Tutti i preferiti sono stati rimossi", "neutral");
  }


  // Stato che contiene gli ID degli smartphone selezionati per il confronto
  const [compareIds, setCompareIds] = useState(() => {
    const saved = localStorage.getItem("compareIds");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("compareIds", JSON.stringify(compareIds));
  }, [compareIds]);


  // Funzione per aggiungere o rimuovere uno smartphone dal confronto
  function toggleCompare(id, title = "") {
    const isAlreadyCompared = compareIds.includes(id);
    const productName =
      title || smartphones.find((phone) => phone.id === id)?.title || "Prodotto";
    const isReplacing = !isAlreadyCompared && compareIds.length >= 2;

    setCompareIds((prev) => {
      if (prev.includes(id)) {
        // Se l'id è già nel confronto, lo rimuovo
      return prev.filter((idConfronto) => idConfronto !== id);
      }
      if (prev.length >= 2) {
        // Se ci sono già 2 smartphone, sostituisco il primo con il nuovo
        return [prev[1], id];
      }
      // Altrimenti aggiungo il nuovo id
      return [...prev, id];
    });

    showToast(
      isAlreadyCompared
        ? `"${productName}" rimosso dal confronto`
        : isReplacing
          ? `"${productName}" aggiunto al confronto (sostituito un modello)`
          : `"${productName}" aggiunto al confronto`,
      isAlreadyCompared ? "neutral" : "compare"
    );
  }
  

  useEffect(() => {
    // Recupero dei dati dal backend all'avvio dell'app
    fetch(`${API_URL}/smartphones`)
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
          <Route index element={<HomePage />} />
          <Route
            path="/smartphones"
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
              <ComparePage compareIds={compareIds} />
            }
          />

          <Route
            path="/favorites"
            element={
              <FavoritesPage
                smartphones={smartphones}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                clearFavorites={clearFavorites}
              />
            }
          />
        </Route>
      </Routes>

      <div className="app-toast-stack" aria-live="polite" aria-atomic="true">
        {toasts.map((toast) => (
          <div key={toast.id} className={`app-toast app-toast-${toast.type}`}>
            <div className="app-toast-content">
              <i
                className={`fa-solid ${
                  toast.type === "favorite"
                    ? "fa-heart"
                    : toast.type === "compare"
                      ? "fa-scale-balanced"
                      : "fa-circle-info"
                }`}
              ></i>
              <span>{toast.message}</span>
            </div>
            <button
              type="button"
              className="app-toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Chiudi notifica"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}
      </div>
    </BrowserRouter>
  );
}

export default App;
