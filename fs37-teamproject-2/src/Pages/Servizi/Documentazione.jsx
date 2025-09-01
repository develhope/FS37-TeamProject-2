import { Button } from "../../Components/Button";

function Documentazione() {
  const documenti = [
    {
      id: 1,
      numero: "PRN1001",
      data: "2025-09-01",
      stato: "Completato",
      tipoServizio: "Visita",
    },
    {
      id: 2,
      numero: "PRN1002",
      data: "2025-09-02",
      stato: "In attesa",
      tipoServizio: "Analisi",
    },
    {
      id: 3,
      numero: "PRN1003",
      data: "2025-09-03",
      stato: "Confermato",
      tipoServizio: "Controllo",
    },
    {
      id: 4,
      numero: "PRN1004",
      data: "2025-09-04",
      stato: "Completato",
      tipoServizio: "Visita",
    },
    {
      id: 5,
      numero: "PRN1005",
      data: "2025-09-05",
      stato: "Annullato",
      tipoServizio: "Farmaci",
    },
  ];
  const getStatusClasses = (stato) => {
    switch (stato) {
      case "Completato":
        return "bg-green-100 text-green-700";
      case "Confermato":
        return "bg-blue-100 text-blue-700";
      case "In attesa":
        return "bg-yellow-100 text-yellow-700";
      case "Annullato":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <p>Numero documenti: {documenti.length}</p>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nr. Prenotazione</th>
              <th className="py-3 px-6 text-left">Tipologia</th>
              <th className="py-3 px-6 text-left">Data</th>
              <th className="py-3 px-6 text-left">Stato</th>
              <th className="py-3 px-6 text-center">Azioni</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {documenti.map((x, i) => (
              <tr
                className="border-b border-gray-200 hover:bg-gray-100"
                key={x.id}
              >
                <td className="py-3 px-6 text-left">{x.numero}</td>
                <td className="py-3 px-6 text-left">{x.tipoServizio}</td>
                <td className="py-3 px-6 text-left">{x.data}</td>
                <td className="py-3 px-6 text-left">
                  {
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClasses(
                        x.stato
                      )}`}
                    >
                      {x.stato}
                    </span>
                  }
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center gap-3 justify-center">
                    <Button label="primary">Visualizza</Button>
                    <Button label="primary">Scarica</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Documentazione;
