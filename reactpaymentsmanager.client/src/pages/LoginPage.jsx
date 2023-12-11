import { useForm } from "react-hook-form"
import { registerRequest } from '../api/auth';
import { loginSchema } from "../schemas/auth/loginShema";
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'react-toastify';
import { useUserCredencials } from "../store/userAuth";
import { dataFromToken } from "../utils/userVerification";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
    const navigate = useNavigate();
    
    const setUserCredencials = useUserCredencials((state)=>state.setUserCredencials);
    const setUserRole = useUserCredencials((state)=>state.setUserRole);
    const setUserIsAuthenticated = useUserCredencials((state)=>state.setUserIsAuthenticated);
    
    const userCredencials = useUserCredencials((state)=>state.userCredencials);
    const userRole = useUserCredencials((state)=>state.userRole);
    const userIsAuthenticated = useUserCredencials((state)=>state.userIsAuthenticated);
    
    useEffect(() => {
        if(userCredencials && userIsAuthenticated && userRole === "Admin")
        {
            navigate('/dashboard');
        }
        if (userCredencials && userIsAuthenticated && userRole === 'User') {
            navigate('/payments/search');
        }
    }, [userCredencials,userIsAuthenticated,userRole,navigate])

    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver: zodResolver(loginSchema),
    });
    
    const onSubmit = async (values) => {
        try{
            const res = await registerRequest(values);
            const userData = dataFromToken(res.data.result.token);
            const userRole= userData.role;
            if(userRole === 'Admin')
            {
                setUserCredencials(res.data.result);
                setUserIsAuthenticated(true);
                setUserRole(userRole);
                navigate('/dashboard');
            }
            else 
            {
                setUserCredencials(res.data.result);
                setUserIsAuthenticated(true);
                setUserRole(userRole);
                navigate('/payments/search');
            }
            toast.success("Bienvenido");
        }catch(error){
            console.log(error);
            toast.error("Credenciales incorrectas");
        }
    }
    
    return (
    <div className="flex items-center justify-center h-full">
        <div className="w-full max-w-sm shadow-2xl card bg-base-100">
                <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" {...register("email",{required:true})} />
                        {
                            errors.email && <span className="mt-2 text-xs text-error">Email es requerido</span>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Contraseña</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" {...register("password",{required:true})} />
                        {
                            errors.password && <span className="mt-2 text-xs text-error">Password es requerido</span>
                        }
                    </div>
                    <div className="mt-6 form-control">
                        <button type='submit' className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
    </div>
  )
}

export default LoginPage