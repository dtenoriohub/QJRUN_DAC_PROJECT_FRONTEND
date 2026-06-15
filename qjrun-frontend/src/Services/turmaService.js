import api from "../Api/axiosConfig";

export const turmaService = {
  async getAll() {
    const response = await api.get("/turmas");
    return response.data;
  }
};