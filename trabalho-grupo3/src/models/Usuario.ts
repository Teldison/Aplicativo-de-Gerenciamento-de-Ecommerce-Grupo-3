interface Usuario{
    id: number,
    nome: string,
    email: string,
    senha: string,
    dataNascimento: Date,
    status: boolean,
    tipoUsuario: string,
}
export default Usuario;