import CrudPage from "../../Components/CrudPage";

export default function Planos() {

  const planos = [
    {
      id: 1,
      tipo: "Mensal",
      preco: "80,00"
    }
  ];

  return (

    <CrudPage
      title="Planos"
      buttonText="Novo Plano"
      columns={[
        "Plano",
        "Preço",
        "Ações"
      ]}
      data={planos}
      renderRow={(plano) => (

        <tr
          key={plano.id}
          className="border-t"
        >

          <td className="p-4">
            {plano.tipo}
          </td>

          <td className="p-4">
            R$ {plano.preco}
          </td>

          <td className="p-4">
            Editar
          </td>

        </tr>

      )}
    />

  );

}