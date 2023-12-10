export const configHeaders = (token) => {
        return(
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
};