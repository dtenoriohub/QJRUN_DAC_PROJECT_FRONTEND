import api from "../Api/axiosConfig";

export const planoService = {
  async getAll() {
    const response = await api.get("/planos");
    return response.data;
  }
};