import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('@qjrun:token');
    const userJson = localStorage.getItem('@qjrun:user');

    // 🔑 Injeta o token para o JwtAuthenticationFilter do Spring ler
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 🔑 Mantém o header customizado que seus outros controllers usam para validação rápida
    if (userJson) {
      const user = JSON.parse(userJson);
      config.headers['Perfil-Usuario'] = user.perfil;
      config.headers['Usuario-Id'] = user.id; // <-- NOVA LINHA ADICIONADA AQUI!
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;