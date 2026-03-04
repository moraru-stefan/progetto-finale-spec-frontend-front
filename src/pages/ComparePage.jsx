import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL;

const ComparePage = ({ compareIds, toggleCompare }) => {
  const navigate = useNavigate();
  //Stato locale che ci permette di recuperare tutti i dettagli completi degli smartphone selezionati per il confronto
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Non faccio il confronto se ci sono meno di 2 smartphone selezionati, interrompo la funzione
    if (compareIds.length < 2) {
      setPhones([]);
      return;
    }
    let cancelled = false;

    // Funzione asincrona per caricare i dettagli completi degli smartphone selezionati
    async function loadPhones() {
      setLoading(true);
      try {
        const loaded = [];
        // Per ogni ID nello stato compareIds, faccio fetch al backend e recupero l'oggetto smartphone
        for (const id of compareIds) {
          const res = await fetch(`${API_URL}/smartphones/${id}`);
          const data = await res.json();
          loaded.push(data.smartphone);
        }
        // Aggiorno lo stato phones con i dati completi appena caricati
        if (!cancelled) {
          setPhones(loaded);
        }
      } catch (err) {
        console.error(
          "Errore nel caricamento degli smartphone da confrontare:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
       // Richiamo la funzione per eseguire il fetch.   
    loadPhones();
    return () => {
      cancelled = true;
    };
  }, [compareIds]);

  function handleRemoveFromCompare(phone) {
    const confirmed = window.confirm(
      `Vuoi rimuovere "${phone.title}" dal confronto?`
    );
    if (!confirmed) return;
    toggleCompare(phone.id, phone.title);
  }

  if (compareIds.length < 2) {
    const hasOnePhone = compareIds.length === 1;
    return (
      <div className="compare-page">
        <section className="compare-empty text-center">
          <i className={`fa-solid ${hasOnePhone ? "fa-circle-info" : "fa-scale-balanced"}`}></i>
          <h1 className="h4 mt-3">
            {hasOnePhone ? "Confronto incompleto" : "Confronto non disponibile"}
          </h1>
          <p className="text-muted mb-3">
            {hasOnePhone
              ? "Hai rimosso uno smartphone: seleziona almeno un altro telefono per continuare il confronto."
              : "Seleziona almeno 2 smartphone dalla vetrina per attivare il confronto."}
          </p>
          {hasOnePhone ? (
            <button
              type="button"
              className="btn home-btn home-primary-btn compare-add-phone-btn"
              onClick={() => navigate("/smartphones")}
            >
              <span>Aggiungi un altro telefono!</span>
            </button>
          ) : (
            <Link to="/smartphones" className="btn compare-empty-btn">
              Scegli smartphone
            </Link>
          )}
        </section>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="compare-page">
        <section className="compare-loading text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
          <p className="mt-3 mb-0">Caricamento confronto in corso...</p>
        </section>
        <Footer />
      </div>
    );
  }

  if (phones.length < 2) {
    return (
      <div className="compare-page">
        <section className="compare-empty text-center">
          <i className="fa-regular fa-face-frown"></i>
          <h1 className="h4 mt-3">Impossibile completare il confronto</h1>
          <p className="text-muted mb-0">Riprova selezionando di nuovo i prodotti.</p>
        </section>
        <Footer />
      </div>
    );
  }

  // Destrutturo l'array phones nei due smartphone selezionati per poterli usare singolarmente nel confronto al posto di scrivere phones[0], phones[1].
  const [first, second] = phones;
  const specs = [
    { label: "Categoria", key: "category" },
    { label: "Marca", key: "brand" },
    { label: "Prezzo", key: "price", suffix: " €" },
    { label: "Sistema operativo", key: "os" },
    { label: "Schermo", key: "screenSize" },
    { label: "RAM", key: "ram" },
    { label: "Memoria", key: "storage" },
  ];

  return (
    <div className="compare-page">
      <section className="compare-hero mb-4">
        <p className="compare-kicker mb-2">Comparatore</p>
        <h1 className="h3 mb-1">Confronto fianco a fianco</h1>
        <p className="mb-0">
          Valuta in un colpo d'occhio quale modello è più adatto alle tue esigenze.
        </p>
      </section>

      <section className="compare-cards-surface mb-4">
        <div className="row g-0">
          {[first, second].map((phone, index) => (
            <div key={phone.id} className="col-12 col-md-6 compare-card-column">
              <article className="compare-phone-card h-100">
                <button
                  type="button"
                  className="btn compare-remove-btn"
                  onClick={() => handleRemoveFromCompare(phone)}
                  aria-label={`Rimuovi ${phone.title} dal confronto`}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <p className="compare-slot mb-2">Modello {index + 1}</p>
                <div className="compare-phone-image">
                  {phone.imageUrl ? (
                    <img src={phone.imageUrl} alt={phone.title} className="phone-detail-img" />
                  ) : (
                    <i className="fa-solid fa-mobile-screen-button"></i>
                  )}
                </div>
                <h2 className="compare-phone-title">{phone.title}</h2>
                <p className="compare-phone-price mb-0">{phone.price} €</p>
                <p className="compare-phone-meta mb-1">
                  {phone.category || "Smartphone"}
                </p>
                <Link className="btn compare-detail-btn mt-3 w-100" to={`/smartphones/${phone.id}`}>
                  Vedi dettagli
                </Link>
              </article>
            </div>
          ))}
        </div>
      </section>

      <section className="compare-specs-card mb-4">
        <h3 className="h5 mb-3">Specifiche a confronto</h3>
        <div className="table-responsive">
          <table className="table compare-table mb-0 align-middle">
            <thead>
              <tr>
                <th>Caratteristica</th>
                <th>{first.title}</th>
                <th>{second.title}</th>
              </tr>
            </thead>
            <tbody>
              {specs.map((spec) => (
                <tr key={spec.key}>
                  <td>{spec.label}</td>
                  <td>{`${first[spec.key]}${spec.suffix || ""}`}</td>
                  <td>{`${second[spec.key]}${spec.suffix || ""}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ComparePage;
