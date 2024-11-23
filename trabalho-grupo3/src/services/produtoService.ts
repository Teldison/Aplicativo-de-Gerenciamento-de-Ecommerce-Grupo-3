import apiProdutos from "./apiProdutos"
import { Produto } from "../types/types"; 

export const getProdutos = async (): Promise<Produto[]> => {
    const {data} = await apiProdutos.get("/Produto");
    return data;
}
export const createProdutos = async (novoProduto: Omit<Produto, "id">) : Promise<Produto> =>{
    const {data} = await  apiProdutos.post("/Produto");
    return data;
}
export const deleteProdutos = async (id : number) : Promise<Produto> =>{
    const {data} = await apiProdutos.delete("/Produto/" + id);
    return data;
}
export const updateProdutos = async (produtoEditado : Produto): Promise<Produto> =>{
    const {data} = await apiProdutos.put("/Produto/" + produtoEditado.id, produtoEditado);
    return data;
}