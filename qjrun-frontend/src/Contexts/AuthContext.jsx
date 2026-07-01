import { createContext, useContext, useState, useEffect } from "react";
import api from "../Api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 💾 Inicializa o estado tentando buscar o usuário já salvo no navegador
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("@qjrun:user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Valida se há um token salvo ao carregar a aplicação
    const token = localStorage.getItem("@qjrun:token");
    if (token) {
      // Aqui você poderia fazer uma chamada opcional para /auth/me se quiser validar o token no backend
    }
    setCarregando(false);
  }, []);

  /**
   * 🔐 FUNÇÃO DE LOGIN CONECTADA AO BACKEND
   */
  const login = async (email, senha) => {
    // 1. Dispara a requisição para o seu AuthController do Spring Boot
    const response = await api.post("/auth/login", { email, senha });
    
    // 📦 Captura o token e todas as propriedades do usuário retornadas pelo backend
    const { token, id, nome, perfilAcesso, perfil } = response.data;

    if (token) {
      // 2. Salva o Token no LocalStorage
      localStorage.setItem("@qjrun:token", token);
      
      // 🚀 Monta o objeto unificado garantindo a captura do ID e do Nome para o Aluno
      const usuarioDados = {
        id: id || response.data.usuario?.id, // Tenta pegar da raiz ou de um objeto interno caso mude no futuro
        nome: nome || response.data.usuario?.nome || "Usuário",
        email: response.data.email || email,
        perfil: perfilAcesso || perfil // Aceita ambas as nomenclaturas de Role
      };
      
      // 🔄 Persiste no LocalStorage de forma definitiva
      localStorage.setItem("@qjrun:user", JSON.stringify(usuarioDados));
      
      // 3. Atualiza o estado global do contexto com o usuário logado
      setUser(usuarioDados);
      
      // Retorna o objeto completo para que o Login.jsx também possa ler as propriedades
      return usuarioDados;
    }
    
    throw new Error("Falha na autenticação");
  };

  /**
   * 🚪 FUNÇÃO DE LOGOUT
   */
  const logout = () => {
    localStorage.removeItem("token"); // Remove o token
    delete api.defaults.headers.common["Authorization"]; // Remove o header do Axios
    setUser(null); // Reseta o estado do usuário para null
};

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,  // 🔑 Disponibiliza a função de login para a tela de Login.jsx
        logout, // 🔑 Disponibiliza o logout para as barras de navegação/dashboards
        carregando
      }}
    >
      {!carregando && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}