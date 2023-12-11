import { Navigate,Outlet } from "react-router"
import {useDateForm} from '../store/payments'

const ProtectedUserPayments = () => {
    const dateForm = useDateForm((state)=>state.dateForm);
    if(dateForm !== null){
        return <Outlet/>
    }    
    return <Navigate to='/payments/search'/>
}

export default ProtectedUserPayments;