import { BrowserRouter, Routes, Route } from "react-router-dom";

import Cadastro from "../Pages/Cadastro/Cadastro";

// AUTH
import Login from "../Pages/Auth/Login";

// ADMIN
import AdminDashboard from "../Pages/Admin/Dashboard";
import Alunos from "../Pages/Admin/Alunos";
import Professores from "../Pages/Admin/Professores";
import Turmas from "../Pages/Admin/Turmas";
import Planos from "../Pages/Admin/Planos";
import Pagamentos from "../Pages/Admin/Pagamentos";
import Eventos from "../Pages/Admin/Eventos";
import Inscricoes from "../Pages/Admin/Inscricoes";

// PROFESSOR
import ProfessorDashboard from "../Pages/Professor/Dashboard";
import MinhasTurmas from "../Pages/Professor/MinhasTurmas";
import MeusAlunos from "../Pages/Professor/MeusAlunos";
import ProfessorEventos from "../Pages/Professor/Eventos";

// ALUNO
import AlunoDashboard from "../Pages/Aluno/Dashboard";
import MeuPlano from "../Pages/Aluno/MeuPlano";
import MinhaTurma from "../Pages/Aluno/MinhaTurma";
import MeusPagamentos from "../Pages/Aluno/MeusPagamentos";
import AlunoEventos from "../Pages/Aluno/Eventos";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* CADASTRO */}
        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/alunos"
          element={<Alunos />}
        />

        <Route
          path="/admin/professores"
          element={<Professores />}
        />

        <Route
          path="/admin/turmas"
          element={<Turmas />}
        />

        <Route
          path="/admin/planos"
          element={<Planos />}
        />

        <Route
          path="/admin/pagamentos"
          element={<Pagamentos />}
        />

        <Route
          path="/admin/eventos"
          element={<Eventos />}
        />

        <Route
          path="/admin/inscricoes"
          element={<Inscricoes />}
        />

        {/* PROFESSOR */}
        <Route
          path="/professor/Dashboard"
          element={<ProfessorDashboard />}
        />

        <Route
          path="/professor/turmas"
          element={<MinhasTurmas />}
        />

        <Route
          path="/professor/alunos"
          element={<MeusAlunos />}
        />

        <Route
          path="/professor/eventos"
          element={<ProfessorEventos />}
        />

        {/* ALUNO */}
        <Route
          path="/aluno/dashboard"
          element={<AlunoDashboard />}
        />

        <Route
          path="/aluno/plano"
          element={<MeuPlano />}
        />

        <Route
          path="/aluno/turma"
          element={<MinhaTurma />}
        />

        <Route
          path="/aluno/pagamentos"
          element={<MeusPagamentos />}
        />

        <Route
          path="/aluno/eventos"
          element={<AlunoEventos />}
        />

      </Routes>
    </BrowserRouter>
  );
}