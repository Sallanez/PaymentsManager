import axios from "axios";
import {configHeaders} from "../utils/userTokenAuth";

const API = "http://localhost:5266/api";

export const uploadSpreedSheetFileRequest = (file,token) => axios.post(`${API}/files`,file,configHeaders(token));

export const getAllSpreedSheetFilesRequest = (token) => axios.get(`${API}/files/list`,configHeaders(token));

export const deleteSpreedSheetFileRequest = (fileId,token) => axios.delete(`${API}/files/${fileId}`,configHeaders(token));

export const getFileExampleRequest = (token) => axios.get(`${API}/files/example`,configHeaders(token));