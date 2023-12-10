import { useNavigate } from 'react-router-dom';
import { useUserCredencials } from '../store/userAuth';

const HomePage = () => {
    const navigation = useNavigate();
    const userCredencials = useUserCredencials((state)=>state.userCredencials);
    const userRole = useUserCredencials((state)=>state.userRole);
    const userIsAuthenticated = useUserCredencials((state)=>state.userIsAuthenticated);
    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-center hero-content">
                <div className="max-w-md">
                <h1 className="text-5xl font-bold">Bienvenido</h1>
                <p className="py-6">Inicia sesión para llevar acabo tus actividades.</p>
                <button className="btn btn-primary" onClick={()=>{
                    if(userCredencials && userIsAuthenticated && userRole === "Admin")
                    {
                        navigation('/dashboard');
                    }
                    if (userCredencials && userIsAuthenticated && userRole === 'User') {
                        navigation('/payments/search');
                    }
                    navigation('/login')
                }}>Comenzar</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage