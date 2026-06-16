import MainLayout from "../../Layouts/MainLayout";

export default function Inscricoes() {

  const inscricoes = [
    {
      id: 1,
      aluno: "João Silva",
      evento: "Corrida da Primavera",
      status: "APROVADA"
    },
    {
      id: 2,
      aluno: "Maria Oliveira",
      evento: "Maratona QJRun",
      status: "PENDENTE"
    }
  ];

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Inscrições
        </h1>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-left">Aluno</th>
              <th className="p-4 text-left">Evento</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Ações</th>

            </tr>

          </thead>

          <tbody>

            {inscricoes.map(inscricao => (

              <tr
                key={inscricao.id}
                className="border-t"
              >

                <td className="p-4">{inscricao.aluno}</td>
                <td className="p-4">{inscricao.evento}</td>
                <td className="p-4">{inscricao.status}</td>

                <td className="p-4 flex gap-2">

                  <button className="bg-green-600 text-white px-3 py-1 rounded">
                    Aprovar
                  </button>

                  <button className="bg-red-600 text-white px-3 py-1 rounded">
                    Recusar
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