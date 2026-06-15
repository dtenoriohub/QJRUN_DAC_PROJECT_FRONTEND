import api from "../Api/axiosConfig";

export const alunoService = {

  async getAll() {
    const response = await api.get("/alunos");
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/alunos/${id}`);
    return response.data;
  },

  async create(aluno) {
    const response = await api.post("/alunos", aluno);
    return response.data;
  },

  async update(id, aluno) {
    const response = await api.put(`/alunos/${id}`, aluno);
    return response.data;
  },

  async delete(id) {
    await api.delete(`/alunos/${id}`);
  }

};