import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../Components/ProtectedRoute"; // 🔑 Importa o protetor

// AUTH
import Login from "../Pages/Auth/Login";
import Cadastro from "../Pages/Auth/Cadastro";
import EsqueciSenha from "../Pages/Auth/RedefinirSenha";

// ADMIN
import AdminDashboard from "../Pages/Admin/Dashboard";
import Alunos from "../Pages/Admin/Alunos";
import Turmas from "../Pages/Admin/Turmas";
import Planos from "../Pages/Admin/Planos";
import Pagamentos from "../Pages/Admin/Pagamentos";
import Eventos from "../Pages/Admin/Eventos";
import Inscricoes from "../Pages/Admin/Inscricoes";

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
        {/* 🔓 ROTAS PÚBLICAS */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />

        {/* 🔐 BLOCO ADMIN (Apenas ROLE_ADMIN acessa) */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/alunos" element={<Alunos />} />
          <Route path="/admin/turmas" element={<Turmas />} />
          <Route path="/admin/planos" element={<Planos />} />
          <Route path="/admin/pagamentos" element={<Pagamentos />} />
          <Route path="/admin/eventos" element={<Eventos />} />
          <Route path="/admin/inscricoes" element={<Inscricoes />} />
        </Route>

        {/* 🔐 BLOCO ALUNO (Apenas ROLE_ALUNO acessa) */}
        <Route element={<ProtectedRoute allowedRoles={["ROLE_ALUNO"]} />}>
          <Route path="/aluno/dashboard" element={<AlunoDashboard />} />
          <Route path="/aluno/plano" element={<MeuPlano />} />
          <Route path="/aluno/turma" element={<MinhaTurma />} />
          <Route path="/aluno/pagamentos" element={<MeusPagamentos />} />
          <Route path="/aluno/eventos" element={<AlunoEventos />} />
        </Route>

        {/* 🛑 ROTA 404 (Caso digitem qualquer outra coisa) */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}