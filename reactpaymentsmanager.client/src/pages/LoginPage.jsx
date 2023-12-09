import { useForm } from "react-hook-form"
import { registerRequest } from '../api/auth';
import { loginSchema } from "../schemas/auth/loginShema";
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'react-toastify';
import { useUserCredencials } from "../store/userAuth";
import { dataFromToken } from "../utils/userVerification";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const setUserCredencials = useUserCredencials((state)=>state.setUserCredencials);
    const userCredencials = useUserCredencials((state)=>state.userCredencials);
    const setUserRole = useUserCredencials((state)=>state.setUserRole);
    const setUserIsAuthenticated = useUserCredencials((state)=>state.setUserIsAuthenticated);
    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver: zodResolver(loginSchema),
    });
    return (
    <div className="min-h-screen hero bg-base-200">
        <div className="w-full max-w-sm shadow-2xl card shrink-0 bg-base-100">
                <form className="card-body" onSubmit={handleSubmit(
                    async (values) => {
                        const res = await registerRequest(values);
                        if(!res.data.isSuccess){
                            toast.error(res.data.errorMessages[0]);
                        }else{
                            setUserCredencials(res.data.result);
                            setUserIsAuthenticated(true);
                            setUserRole(dataFromToken(userCredencials.token).role);
                            const user = dataFromToken(userCredencials.token);
                            if(user.role === 'Admin')
                            {
                                navigate('/dashboard');
                            }
                            else 
                            {
                                navigate('/payments');
                            }
                            toast.success("Bienvenido");
                        }
                    }
                )}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" {...register("email",{require:true})} />
                        {
                            errors.email && <span className="mt-2 text-xs text-error">Email is required</span>
                        }
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" {...register("password",{require:true})} />
                        {
                            errors.password && <span className="mt-2 text-xs text-error">Password is required</span>
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