import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

import Button from "../../Components/Button";
import Input from "../../Components/Input";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const usuarioLogado = await login(email, senha);

      // 🔑 Mapeamento unificado das propriedades retornadas pelo seu AuthMapper do Spring
      const role = usuarioLogado.perfilAcesso || usuarioLogado.perfil;
      const idUsuario = usuarioLogado.id; // 📥 Captura o ID do usuário vindo da resposta do backend

      // 🔄 Salva o objeto no localStorage incluindo o ID essencial para a FK dos Planos
      const usuarioDados = {
        id: idUsuario,
        nome: usuarioLogado.nome, // Já deixa o nome disponível para exibir na Sidebar
        email: email,
        perfil: role 
      };
      localStorage.setItem("@qjrun:user", JSON.stringify(usuarioDados));

      // 🔀 Redirecionamento baseado nas ROLES oficiais
      if (role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "ROLE_PROFESSOR") {
        navigate("/professor/dashboard");
      } else if (role === "ROLE_ALUNO") {
        navigate("/aluno/dashboard");
      } else {
        setErro("Perfil de acesso não reconhecido.");
      }

    } catch (err) {
      console.error(err);
      setErro("E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-black">
            <span className="text-lime-500">QJ</span>Run
          </h1>
          <p className="text-gray-600 mt-2">
            Sistema para gerenciamento de corridas e eventos esportivos.
          </p>
        </div>

        {erro && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm text-center font-medium">
            {erro}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <Button type="submit" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </Button>
          
          <button
            type="button"
            className="w-full text-green-800 hover:text-green-600 font-medium text-sm"
            onClick={() => navigate("/esqueci-senha")}
          >
            Esqueci minha senha
          </button>

          <button
            type="button"
            className="w-full text-green-800 hover:text-green-600 font-medium text-sm"
            onClick={() => navigate("/cadastro")}
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
}