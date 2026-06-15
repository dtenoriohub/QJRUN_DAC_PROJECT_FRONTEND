import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
    "Perfil-Usuario": "ROLE_ADMIN"
  }
});

export default api;