import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Pages/Login/Login";
import Cadastro from "../Pages/Cadastro/Cadastro";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Alunos from "../Pages/Alunos/Alunos";
import Professores from "../Pages/Professores/Professores";
import Turmas from "../Pages/Turmas/Turmas";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/professores" element={<Professores />} />
        <Route path="/turmas" element={<Turmas />} />
      </Routes>
    </BrowserRouter>
  );
}