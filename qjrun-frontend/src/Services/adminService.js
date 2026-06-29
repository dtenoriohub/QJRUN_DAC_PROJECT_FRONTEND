import api from '../Api/api';

export const adminService = {
  // Função para salvar o administrador que configuramos no backend
  cadastrar: async (dadosAdmin) => {
    try {
      // Como o interceptor já coloca a URL e o cabeçalho padrão, passamos apenas a rota
      const response = await api.post('/administrador', dadosAdmin, {
        // Forçamos o cabeçalho de admin caso o usuário ainda esteja se cadastrando
        headers: { 'Perfil-Usuario': 'ROLE_ADMIN' }
      });
      return response.data;
    } catch (error) {
      // Repassa o erro contendo a mensagem vinda do Spring Boot
      throw error.response?.data?.message || 'Erro ao processar cadastro.';
    }
  },

  // Exemplo de listagem caso precise usar na página Admin futuramente
  listarTodos: async () => {
    const response = await api.get('/administrador');
    return response.data;
  }
};