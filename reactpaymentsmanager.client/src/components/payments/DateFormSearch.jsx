import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { dateFormSchema } from "../../schemas/payments/dateFormSchema";
import {useUserCredencials} from '../../store/userAuth';
import {useDateForm} from '../../store/payments';
import {useRecords} from '../../store/payments';
import {getAllSpreedSheetFilesRequest} from "../../api/payments"
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const DateFormSearch = () => {
    const navigate = useNavigate();

    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver: zodResolver(dateFormSchema),
    });

    const setDateForm = useDateForm((state)=>state.setDateForm);
    const userCredencials = useUserCredencials((state)=>state.userCredencials);
    const setPaymentRecords = useRecords((state)=>state.setPaymentRecords);
    const setFilteredPaymentRecords = useRecords((state)=>state.setFilteredPaymentRecords);

    const onSubmit = async (values) => {
        if(values.month && values.year)
        {
            try{
                const res = await getAllSpreedSheetFilesRequest(userCredencials.token);
                if(res.data.length > 0){
                    setPaymentRecords(res.data);
                    setDateForm(values);
                    const combinedDate = `${String(values.year)}-${values.month}`;
                    
                    // Filter paymentRecords based on spreedsheetDate matching combinedDate
                    const filteredPayments = res.data.filter(record => record.spreadSheetDate.substring(0, 7) === combinedDate);
                    setFilteredPaymentRecords(filteredPayments);
                    toast.success(`${filteredPayments.length} registros encontrados para ${values.month}/${String(values.year)}`);
                }else{
                    toast.warning("No hay registros de pagos");
                }
            }catch(error){
                console.error(`${error.message}`);
                toast.error("Error al obtener los registros de pagos");
            }finally{
                navigate('/payments');
            }
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