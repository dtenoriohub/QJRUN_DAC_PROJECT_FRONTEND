import MainLayout from "../../Layouts/MainLayout";

export default function Eventos() {

  const eventos = [
    {
      id: 1,
      nome: "Corrida da Primavera",
      data: "15/09/2026",
      local: "João Pessoa"
    },
    {
      id: 2,
      nome: "Maratona QJRun",
      data: "20/11/2026",
      local: "Campina Grande"
    }
  ];

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Eventos
        </h1>

        <button
          className="
            bg-green-700
            hover:bg-green-800
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Novo Evento
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">
              <th className="p-4 text-left">Nome</th>
              <th className="p-4 text-left">Data</th>
              <th className="p-4 text-left">Local</th>
              <th className="p-4 text-left">Ações</th>
            </tr>

          </thead>

          <tbody>

            {eventos.map(evento => (

              <tr key={evento.id} className="border-t">

                <td className="p-4">{evento.nome}</td>
                <td className="p-4">{evento.data}</td>
                <td className="p-4">{evento.local}</td>

                <td className="p-4 flex gap-2">

                  <button className="bg-blue-600 text-white px-3 py-1 rounded">
                    Editar
                  </button>

                  <button className="bg-red-600 text-white px-3 py-1 rounded">
                    Cancelar
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