import api from "../Api/axiosConfig";

export async function listarAlunos() {

  const response = await api.get(
    "/alunos",
    {
      headers: {
        "Perfil-Usuario": "ROLE_ADMIN"
      }
    }
  );

  return response.data;
}

export async function criarAluno(aluno) {

  const response = await api.post(
    "/alunos",
    aluno,
    {
      headers: {
        "Perfil-Usuario": "ROLE_ADMIN"
      }
    }
  );

  return response.data;
}

export async function atualizarAluno(id, aluno) {

  const response = await api.put(
    `/alunos/${id}`,
    aluno
  );

  return response.data;
}

export async function excluirAluno(id) {

  await api.delete(
    `/alunos/${id}`,
    {
      headers: {
        "Perfil-Usuario": "ROLE_ADMIN"
      }
    }
  );

}