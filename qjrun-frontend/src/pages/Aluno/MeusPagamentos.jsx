import MainLayout from "../../Layouts/MainLayout";

export default function MeusPagamentos() {

  const pagamentos = [
    {
      id: 1,
      valor: "R$ 80,00",
      status: "PAGO"
    },
    {
      id: 2,
      valor: "R$ 80,00",
      status: "PENDENTE"
    }
  ];

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Meus Pagamentos
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">
              <th className="p-4 text-left">Valor</th>
              <th className="p-4 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {pagamentos.map(pagamento => (

              <tr key={pagamento.id} className="border-t">

                <td className="p-4">
                  {pagamento.valor}
                </td>

                <td className="p-4">
                  {pagamento.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}