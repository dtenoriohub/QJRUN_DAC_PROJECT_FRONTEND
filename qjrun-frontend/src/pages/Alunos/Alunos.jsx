import MainLayout from "../../Layouts/MainLayout";

export default function Alunos() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Alunos
      </h1>

      <div className="bg-white rounded-xl shadow p-6">
        Lista de alunos
      </div>
    </MainLayout>
  );
}