import TablePayments from "../components/payments/TablePayments";
import { useNavigate } from "react-router";

const Payments = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-row justify-center my-8">
        {/* Modal Controller */}
        <button className="btn btn-primary" onClick={()=>{
          navigate('/payments/search');
        }}>Buscar en otra feacha</button>
      </div>
      <TablePayments/>
    </>
  )
}

export default Payments;
