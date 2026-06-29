import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importado useNavigate para redirecionamento
import { adminService } from "../../Services/adminService"; // Importação do serviço integrado

import Button from "../../Components/Button";
import Input from "../../Components/Input";

export default function Cadastro() {
  const navigate = useNavigate(); // Instanciando o hook de navegação
  
  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    senha: "",
    confirmarSenha: ""
  });

  // Estados de controle para a interface
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((old) => ({
      ...old,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErro(""); // Limpa erros antigos

    // 1. Validação local de senha antes de enviar para a API
    if (form.senha !== form.confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      // 2. Destruímos o 'confirmarSenha' para enviar ao backend apenas o DTO limpo
      const { confirmarSenha, ...dadosParaEnvio } = form;

      // 3. Chamada da API via service
      await adminService.cadastrar(dadosParaEnvio);

      alert("Conta de Administrador criada com sucesso!");
      
      // 4. Redireciona para a tela de login (mude a rota "/" se a sua for diferente)
      navigate("/");
    } catch (mensagemDeErro) {
      // Captura a mensagem de erro que vem direto do seu Spring Boot ("E-mail já cadastrado", etc.)
      setErro(mensagemDeErro);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-10">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">
            <span className="text-lime-500">QJ</span>Run
          </h1>
          <p className="text-gray-500 mt-2">
            Crie sua conta de Administrador
          </p>
        </div>

        {/* 🚨 Mensagem de Erro Dinâmica */}
        {erro && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-xl text-center font-medium">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="nome"
            placeholder="Nome completo"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <Input
            name="cpf"
            placeholder="CPF"
            value={form.cpf}
            onChange={handleChange}
            required
          />

          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            required
          />

          <Input
            name="telefone"
            placeholder="Telefone"
            value={form.telefone}
            onChange={handleChange}
          />

          <Input
            name="dataNascimento"
            type="date"
            value={form.dataNascimento}
            onChange={handleChange}
            required
          />

          <Input
            name="senha"
            type="password"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />

          <Input
            name="confirmarSenha"
            type="password"
            placeholder="Confirmar senha"
            value={form.confirmarSenha}
            onChange={handleChange}
            required
          />

          {/* O botão fica desabilitado enquanto a requisição estiver processando */}
          <Button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Criar Conta"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-lime-600 hover:underline">
            Já possui conta? Faça login
          </Link>
        </div>

      </div>
    </div>
  );
}