import axios from "axios";
import {configHeaders} from "../utils/userTokenAuth";

const API = import.meta.env.VITE_API_URL;

export const getAllSpreedSheetFilesRequest = (token) => axios.get(`${API}/payments`,configHeaders(token));

