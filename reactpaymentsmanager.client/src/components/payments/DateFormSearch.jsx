import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dateFormSchema } from "../../schemas/payments/dateFormSchema";
import {useDateForm} from '../../store/payments';
import { useNavigate } from "react-router";

const DateFormSearch = () => {
    const navigate = useNavigate();
    const setDateForm = useDateForm((state)=>state.setDateForm);

    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver: zodResolver(dateFormSchema),
    });

    const onSubmit = async (values) => {
        if(values.month && values.year)
        {
            setDateForm({month:values.month,year:String(values.year)});
            navigate('/payments');
        }
    }

  return (
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="card-title">Buscar pagos</h2>
            <div className="flex flex-col items-center justify-center gap-2 p-4 space-x-3 bg-gray-800 rounded-md">
                <div className="flex flex-col justify-center">
                    <label htmlFor ="month" className="block text-sm font-medium text-gray-200">Mes</label>
                    <select id="month" name="month" className="block w-full py-2 pl-3 pr-10 mt-1 text-white bg-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" {...register("month",{required:true})}>
                        <option value="">Selecciona el mes</option>
                        <option value="01">Enero</option>
                        <option value="02">Febrero</option>
                        <option value="03">Marzo</option>
                        <option value="04">Abril</option>
                        <option value="05">Mayo</option>
                        <option value="06">Junio</option>
                        <option value="07">Julio</option>
                        <option value="08">Agosto</option>
                        <option value="09">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                    </select>
                    {
                        errors.month && <span className="text-red-500">Este campo es requerido</span>
                    }
                </div>
                <div className="flex flex-col justify-center">
                    <label className="block text-sm font-medium text-gray-200">
                        <span className="text-gray-300 label-text">Año</span>
                    </label>
                    <input type="number" min="1900" max="2099" placeholder="YYYY" className="block w-full py-2 pl-3 pr-10 mt-1 text-white bg-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" {...register('year',{required:true})}/>
                    {
                        errors.year && <span className="text-red-500">Este campo es requerido</span>
                    }
                </div>
            </div>
            <div className="mt-6 form-control">
                <button type='submit' className="btn btn-primary">Buscar</button>
            </div>
        </form>
    )
}

export default DateFormSearch