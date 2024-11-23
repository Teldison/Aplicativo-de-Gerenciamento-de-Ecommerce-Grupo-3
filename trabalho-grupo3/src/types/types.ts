export interface User {
    id?: number | undefined;
    nome: string;
    email: string;
    senha: string;
};
export type UserEditado = {
    user: User | undefined;
    editando: boolean;
}

export type Produto ={
    id?: number | undefined;
    nome: string;
    preco: number;
    descricao: string;
    imagem: null;
};
export type ProdutoEditado = {
    item: Produto  | undefined;
    editando : boolean;
}