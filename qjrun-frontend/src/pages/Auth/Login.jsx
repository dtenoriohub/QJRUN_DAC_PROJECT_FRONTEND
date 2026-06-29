import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

import Button from "../../Components/Button";
import Input from "../../Components/Input";

export default function Login() {
  const navigate = useNavigate();
  
  // 🔑 1. Puxamos a função 'login' lá de dentro do seu Contexto de Autenticação
  const { login } = useAuth();

  // 📝 2. Criamos os estados para capturar os textos digitados e possíveis erros
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  // 🔄 3. Função de login integrada com o backend
  const handleLogin = async (e) => {
    e.preventDefault(); // Evita que a página recarregue
    setErro("");
    setCarregando(true);

    try {
      // Chama a função do seu Contexto que dispara o Axios e salva o Token
      const usuarioLogado = await login(email, senha);

      // 🔀 Com base no perfil do usuário retornado pelo AuthMapper, redireciona:
      if (usuarioLogado.perfilAcesso === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else if (usuarioLogado.perfilAcesso === "ROLE_PROFESSOR") {
        navigate("/professor/dashboard");
      } else if (usuarioLogado.perfilAcesso === "ROLE_ALUNO") {
        navigate("/aluno/dashboard");
      }

    } catch (err) {
      console.error(err);
      // Se o backend der erro (ex: senha errada ou usuário não existe)
      setErro("E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
      "
    >
      <div
        className="
          bg-white
          w-full
          max-w-md
          p-10
          rounded-3xl
          shadow-xl
        "
      >
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-black">
            <span className="text-lime-500">QJ</span>Run
          </h1>
          <p className="text-gray-600 mt-2">
            Sistema para gerenciamento de corridas e eventos esportivos.
          </p>
        </div>

        {/* ⚠️ Alerta de erro visual elegante */}
        {erro && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm text-center font-medium">
            {erro}
          </div>
        )}

        {/* Envolvemos o bloco em um <form> para aceitar o "Enter" do teclado */}
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 🔑 Captura o e-mail
            required
          />

          <Input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)} // 🔑 Captura a senha
            required
          />

          <Button type="submit" disabled={carregando}>
            {carregando ? "Entrando..." : "Entrar"}
          </Button>
          
          <button
            type="button"
            className="
              w-full
              text-green-800
              hover:text-green-600
              font-medium
              text-sm
            "
            onClick={() => navigate("/esqueci-senha")}
          >
            Esqueci minha senha
          </button>

          <button
            type="button"
            className="
              w-full
              text-green-800
              hover:text-green-600
              font-medium
              text-sm
            "
            onClick={() => navigate("/cadastro")}
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
}