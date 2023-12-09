import axios from "axios";

const API = "http://localhost:5266/api";

const configFunc = (token) => {
        return(
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
}

export const getAllSpreedSheetFilesRequest = (token) => axios.get(`${API}/files/list`,configFunc(token));

export const deleteSpreedSheetFileRequest = (fileId,token) => axios.delete(`${API}/files/${fileId}`,configFunc(token));
