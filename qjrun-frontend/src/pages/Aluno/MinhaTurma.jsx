import MainLayout from "../../Layouts/MainLayout";

export default function MinhaTurma() {

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Minha Turma
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <p><strong>Turma:</strong> Iniciante</p>

        <p><strong>Nível:</strong> INICIANTE</p>

        <p><strong>Horário:</strong> 18:00 às 19:00</p>

      </div>

    </MainLayout>
  );
}