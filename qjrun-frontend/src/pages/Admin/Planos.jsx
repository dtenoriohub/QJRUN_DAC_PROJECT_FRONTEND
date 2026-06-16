import MainLayout from "../../Layouts/MainLayout";

export default function Planos() {

  const planos = [
    {
      id: 1,
      tipo: "Plano Pendente",
      preco: "R$ 0,00",
      duracao: "0 meses"
    },
    {
      id: 2,
      tipo: "Mensal",
      preco: "R$ 80,00",
      duracao: "1 mês"
    }
  ];

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Planos
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
          Novo Plano
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-left">Tipo</th>
              <th className="p-4 text-left">Preço</th>
              <th className="p-4 text-left">Duração</th>
              <th className="p-4 text-left">Ações</th>

            </tr>

          </thead>

          <tbody>

            {planos.map(plano => (

              <tr
                key={plano.id}
                className="border-t"
              >

                <td className="p-4">{plano.tipo}</td>
                <td className="p-4">{plano.preco}</td>
                <td className="p-4">{plano.duracao}</td>

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