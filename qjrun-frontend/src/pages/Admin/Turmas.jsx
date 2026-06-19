import CrudPage from "../../Components/CrudPage";

export default function Turmas() {

  const turmas = [
    {
      id: 1,
      nome: "Iniciante",
      horario: "18:00"
    },
    {
      id: 2,
      nome: "Intermediário",
      horario: "19:00"
    }
  ];

  return (

    <CrudPage
      title="Turmas"
      buttonText="Nova Turma"
      columns={[
        "Nome",
        "Horário",
        "Ações"
      ]}
      data={turmas}
      renderRow={(turma) => (

        <tr
          key={turma.id}
          className="border-t"
        >

          <td className="p-4">
            {turma.nome}
          </td>

          <td className="p-4">
            {turma.horario}
          </td>

          <td className="p-4">

            <button
              className="
                bg-blue-600
                text-white
                px-3
                py-1
                rounded
              "
            >
              Editar
            </button>

          </td>

        </tr>

      )}
    />

  );

}