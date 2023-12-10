import axios from "axios";
import {configHeaders} from "../utils/userTokenAuth";

const API = "http://localhost:5266/api";

export const getAllSpreedSheetFilesRequest = (token) => axios.get(`${API}/payments`,configHeaders(token));

