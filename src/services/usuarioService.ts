import { Produto, User } from "../types/types";
import api from "./api";

export const getUsuarios = async() : Promise<User[]> =>{
    const {data} = await api.get("/usuarios");
    return data;
}
export const createUsuarios = async(novoUser : Omit<User, "id">) : Promise<User> =>{
    const {data} = await api.post("/usuarios");
    return data;
}
export const deleteUsuarios = async(id: number) : Promise<User> =>{
    const {data} = await api.delete("/usuarios/" + "id");
    return data;
}
export const updateUsuarios = async(usuarioEditado : User) : Promise<User>=>{
    const {data} = await api.put("/usuarios/" + usuarioEditado.id, usuarioEditado)
    return data;
}