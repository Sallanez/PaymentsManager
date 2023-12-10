import { getInitialsFromEmail } from "../../utils/userName"
import { useUserCredencials } from "../../store/userAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Navbar = () => {

    const userIsAuthenticated = useUserCredencials((state) => state.userIsAuthenticated);
    const userRole = useUserCredencials((state) => state.userRole);
    const userCredencials = useUserCredencials((state) => state.userCredencials);

    const setUserIsAuthenticated = useUserCredencials((state) => state.setUserIsAuthenticated);
    const setUserRole = useUserCredencials((state) => state.setUserRole);
    const setUserCredencials = useUserCredencials((state) => state.setUserCredencials);

    const [userNames, setUserNames] = useState();

    const navigate = useNavigate();

    useEffect(()=>{
        if(userIsAuthenticated){
            setUserNames(getInitialsFromEmail(userCredencials.email));
        }
    },[userCredencials,userIsAuthenticated]);

    const logout = () => {
        setUserIsAuthenticated(false);
        setUserRole(null);
        setUserCredencials(null);
        navigate('/');
    }

    return (
        <nav className="navbar bg-base-100">
            <div className="ml-8 navbar-start">
                <div className="flex flex-col md:flex-row con">
                    <a className="text-xl btn btn-ghost">Adminstrador de Pagos</a>
                    {
                        userIsAuthenticated && userRole !== null && userCredencials !== null && (
                            <div className="flex flex-col items-center gap-2 mt-6 md:mt-0 md:flex-row">
                                <div className="avatar placeholder">
                                    <div className="w-12 rounded-full bg-neutral text-neutral-content">
                                        <span>{userNames}</span>
                                    </div>
                                </div> 
                                <div>
                                    <p>{userCredencials.email}</p>
                                    <p>{userRole}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            {
                userIsAuthenticated && userRole !== null && userCredencials !== null && (
                    <div className=" navbar-end">
                        <a className="mr-8 btn btn-accent" onClick={()=>logout()}>Log out</a>
                    </div>
                )
            }
        </nav>
    )
}

export default Navbar