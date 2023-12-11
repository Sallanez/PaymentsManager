import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const registerRequest = user => axios.post(`${API}/auth/login`,user);5