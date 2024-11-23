import { User } from "../types/types";
import api from "./apiProdutos";

const login = async (usuario: { email: string, senha: string;}) =>{
    try{
        return await api.get(`users?email=${usuario.email}&senha=${usuario.senha}`);
    }
    catch(err){
        return console.error(err);
    }
}
export default {login};


export const getUsuarios = async() : Promise<User[]> =>{
    const {data} = await api.get("/cadastro");
    return data;
}
export const createUsuarios = async(novoUser : Omit<User, "id">) : Promise<User> =>{
    const {data} = await api.post("/cadastro");
    return data;
}
export const deleteUsuarios = async(id: number) : Promise<User> =>{
    const {data} = await api.delete("/cadastro/" + "id");
    return data;
}
export const updateUsuarios = async(usuarioEditado : User) : Promise<User>=>{
    const {data} = await api.put("/cadastro/" + usuarioEditado.id, usuarioEditado)
    return data;
}
