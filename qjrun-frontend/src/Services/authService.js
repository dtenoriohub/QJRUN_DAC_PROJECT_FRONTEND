import api from './api';

export const authService = {
  login: async (email, senha) => {
    // Dispara o POST para o endpoint do seu AuthController
    const response = await api.post('/auth/login', { email, senha });
    
    // Se o backend retornou o token (gerado pelo seu JwtService)
    if (response.data && response.data.token) {
      // 💾 Salva no LocalStorage para persistir a sessão do usuário
      localStorage.setItem('@qjrun:token', response.data.token);
      localStorage.setItem('@qjrun:user', JSON.stringify({
        email: response.data.email,
        perfil: response.data.perfilAcesso // Garanta que o nome deste atributo bata com o seu LoginResponseDTO
      }));
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('@qjrun:token');
    localStorage.removeItem('@qjrun:user');
  }
};