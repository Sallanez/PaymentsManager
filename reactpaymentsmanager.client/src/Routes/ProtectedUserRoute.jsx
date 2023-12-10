import { Navigate,Outlet } from "react-router"
import {useUserCredencials} from '../store/userAuth'

const ProtectedUserRoute = () => {
    const userRole = useUserCredencials((state)=>state.userRole);
    const userIsAuthenticated = useUserCredencials((state)=>state.userIsAuthenticated);
    const userCredencials = useUserCredencials((state)=>state.userCredencials);
    if(userIsAuthenticated && userCredencials && userRole === 'User'){
        return <Outlet/>
    }    
    return <Navigate to='/login'/>
}

export default ProtectedUserRoute