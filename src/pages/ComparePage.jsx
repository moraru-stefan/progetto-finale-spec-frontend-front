const ComparePage = ({ smartphones, compareIds }) => {
  // Filtro gli smartphone per prendere solo quelli selezionati
  const selected = smartphones.filter((s) => compareIds.includes(s.id));

  // Se ci sono meno di 2 smartphone selezionati, mostro un messaggio
  if (selected.length < 2) {
    return (
      <p>
        Seleziona almeno <strong>2</strong> smartphone dalla lista o dal
        dettaglio per confrontarli.
      </p>
    );
  }

  // Estraggo i due smartphone selezionati
  const [first, second] = selected;

  return (
    <div>
      <h1 className="mb-3">Confronto Smartphone</h1>

      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h2 className="h4">{first.title}</h2>
              <p>
                <strong>Categoria:</strong> {first.category}
              </p>
              <p>
                <strong>Brand:</strong> {first.brand}
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
                <strong>Storage:</strong> {first.storage}
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h2 className="h4">{second.title}</h2>
              <p>
                <strong>Categoria:</strong> {second.category}
              </p>
              <p>
                <strong>Brand:</strong> {second.brand}
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
                <strong>Storage:</strong> {second.storage}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
