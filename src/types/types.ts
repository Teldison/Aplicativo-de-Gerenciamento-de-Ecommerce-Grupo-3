export interface User {
    id?: number;
    usuario: string;
    senha: string;
};
export type UserEditado = {
    user: User | undefined;
    editando: boolean;
}

export type Produto ={
    id?: number;
    nome: string;
    preco: number;
    descricao: string;
    imagem: null;
};
export type ProdutoEditado = {
    item: Produto  | undefined;
    editando : boolean;
}