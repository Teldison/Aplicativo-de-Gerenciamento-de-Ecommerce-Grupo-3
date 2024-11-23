import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "https://673f9791a9bc276ec4b90c2f.mockapi.io"
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.log(error.response.data?.message || 'Erro desconhecido');

    } else if (error.request) {
      console.log("Erro de conexão ou nenhuma resposta do servidor.");
    } else {
      console.log(`Erro ao configurar a requisição: ${error.message}`)
    }
    return Promise.reject(error); 
  }
);
export default api;