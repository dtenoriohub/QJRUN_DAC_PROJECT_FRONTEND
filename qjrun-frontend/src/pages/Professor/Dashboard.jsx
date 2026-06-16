import MainLayout from "../../Layouts/MainLayout";

export default function Dashboard() {
  return (
    <MainLayout>

      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-6
        "
      >

        <div className="bg-white p-6 rounded-xl shadow">
          Total de Alunos
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          Professores
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          Turmas
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          Financeiro
        </div>

      </div>

    </MainLayout>
  );
}