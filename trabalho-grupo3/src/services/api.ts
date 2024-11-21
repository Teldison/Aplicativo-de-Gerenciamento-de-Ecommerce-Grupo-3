import axios from "axios";

const api = axios.create({
    baseURL: "https://673f9791a9bc276ec4b90c2f.mockapi.io"
});

export default api;