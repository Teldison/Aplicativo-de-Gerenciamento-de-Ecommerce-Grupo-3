import { User } from "../types/types";
import api from "./apiUsuarios";

const login = async (usuario: { email: string; senha: string; }): Promise<User | null> => {
  try {
    const { data } = await api.get(`users?email=${usuario.email}&senha=${usuario.senha}`);
    if (data.length > 0) {
      return data[0];
    }
    return null;
  } catch (err) {
    console.error("Erro ao tentar fazer login:", err);
    throw new Error("Erro de conexão com o servidor");
  }
};

export default { login };

export const getUsuarios = async (): Promise<User[]> => {
  try {
    const { data } = await api.get("/cadastro");
    return data;
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    throw new Error("Erro ao buscar usuários");
  }
};

export const createUsuarios = async (novoUser: Omit<User, "id">): Promise<User> => {
  try {
    const { data } = await api.post("/cadastro", novoUser);
    return data;
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    throw new Error("Erro ao criar usuário");
  }
};

export const deleteUsuarios = async (id: number): Promise<void> => {
  try {
    await api.delete(`/cadastro/${id}`);
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    throw new Error("Erro ao deletar usuário");
  }
};

export const updateUsuarios = async (usuarioEditado: User): Promise<User> => {
  try {
    const { data } = await api.put(`/cadastro/${usuarioEditado.id}`, usuarioEditado);
    return data;
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    throw new Error("Erro ao atualizar usuário");
  }
};
