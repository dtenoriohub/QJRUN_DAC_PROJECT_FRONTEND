import MainLayout from "../../Layouts/MainLayout";

export default function Pagamentos() {

  const pagamentos = [
    {
      id: 1,
      aluno: "João Silva",
      plano: "Mensal",
      valor: "R$ 80,00",
      status: "PAGO"
    },
    {
      id: 2,
      aluno: "Maria Oliveira",
      plano: "Anual",
      valor: "R$ 600,00",
      status: "PENDENTE"
    }
  ];

  return (
    <MainLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Pagamentos
        </h1>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-left">Aluno</th>
              <th className="p-4 text-left">Plano</th>
              <th className="p-4 text-left">Valor</th>
              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {pagamentos.map(pagamento => (

              <tr
                key={pagamento.id}
                className="border-t"
              >

                <td className="p-4">{pagamento.aluno}</td>
                <td className="p-4">{pagamento.plano}</td>
                <td className="p-4">{pagamento.valor}</td>

                <td className="p-4">

                  <span
                    className={
                      pagamento.status === "PAGO"
                        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                        : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                    }
                  >
                    {pagamento.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}