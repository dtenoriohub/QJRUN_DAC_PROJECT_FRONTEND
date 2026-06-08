import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Pages/Login/Login";
import Cadastro from "../Pages/Cadastro/Cadastro";
import Home from "../Pages/Home/Home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}