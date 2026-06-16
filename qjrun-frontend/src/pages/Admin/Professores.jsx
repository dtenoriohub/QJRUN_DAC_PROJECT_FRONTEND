import MainLayout from "../../Layouts/MainLayout";

export default function Professores() {

  const professores = [
    {
      id: 1,
      nome: "Carlos Silva",
      especialidade: "Corrida de Rua",
      telefone: "(83) 99999-9999"
    },
    {
      id: 2,
      nome: "Ana Souza",
      especialidade: "Treinamento Funcional",
      telefone: "(83) 98888-8888"
    }
  ];

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Professores
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
          Novo Professor
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-left">Nome</th>
              <th className="p-4 text-left">Especialidade</th>
              <th className="p-4 text-left">Telefone</th>
              <th className="p-4 text-left">Ações</th>

            </tr>

          </thead>

          <tbody>

            {professores.map(professor => (

              <tr
                key={professor.id}
                className="border-t"
              >

                <td className="p-4">{professor.nome}</td>
                <td className="p-4">{professor.especialidade}</td>
                <td className="p-4">{professor.telefone}</td>

                <td className="p-4 flex gap-2">

                  <button className="bg-blue-600 text-white px-3 py-1 rounded">
                    Editar
                  </button>

                  <button className="bg-red-600 text-white px-3 py-1 rounded">
                    Desativar
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