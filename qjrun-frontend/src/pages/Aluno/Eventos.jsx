import MainLayout from "../../Layouts/MainLayout";

export default function Eventos() {

  const eventos = [
    {
      id: 1,
      nome: "Corrida da Primavera",
      data: "15/09/2026"
    },
    {
      id: 2,
      nome: "Maratona QJRun",
      data: "20/11/2026"
    }
  ];

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Eventos
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-left">Evento</th>
              <th className="p-4 text-left">Data</th>
              <th className="p-4 text-left">Ação</th>

            </tr>

          </thead>

          <tbody>

            {eventos.map(evento => (

              <tr key={evento.id} className="border-t">

                <td className="p-4">
                  {evento.nome}
                </td>

                <td className="p-4">
                  {evento.data}
                </td>

                <td className="p-4">

                  <button
                    className="
                      bg-green-700
                      text-white
                      px-3
                      py-1
                      rounded
                    "
                  >
                    Inscrever-se
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}