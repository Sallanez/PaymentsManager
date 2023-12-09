import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigation = useNavigate();
    return (
        <div className="min-h-screen hero bg-base-200">
            <div className="text-center hero-content">
                <div className="max-w-md">
                <h1 className="text-5xl font-bold">Bienvenido</h1>
                <p className="py-6">Inicia sesión para llevar acabo tus actividades.</p>
                <button className="btn btn-primary" onClick={()=>{
                    navigation('/login')
                }}>Comenzar</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage