import { jwtDecode } from "jwt-decode"

export const dataFromToken = (token) => {
    const dataDecoded = jwtDecode(token);
    const isTokenValid = dataDecoded.exp && dataDecoded.exp > Date.now() / 1000;
    console.log(dataDecoded);
    if(isTokenValid)
    {
        return dataDecoded;
    }
    else
    {
        return null;
    }
}