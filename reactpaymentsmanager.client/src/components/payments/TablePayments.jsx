import {useRecords} from "../../store/payments";
import DetailsModalView from "./DetailsModalView";
import { useState } from "react";

const TablePayments = () => {

    const filteredPaymentRecords = useRecords((state)=>state.filteredPaymentRecords);
    const [modalDetails,setModalDetails] = useState({
        "id": "",
        "fullName": "",
        "employeeCode": "",
        "spreadSheetDate": "",
        "isssDiscountRate": 0,
        "afpDiscountRate": 0,
        "rentDiscountRate": 0,
        "netSalary": 0,
        "spreedSheetFileId": ""
    });
    
    return (
        <div className="my-8 overflow-x-auto">
            <DetailsModalView records={modalDetails} />
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Boleta</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredPaymentRecords.length === 0 ? (
                            <tr>
                                <td colSpan="3" className="text-center">No hay registros</td>
                            </tr>
                        ) : (
                            filteredPaymentRecords.map((record,index)=>{
                                return(
                                    <tr key={record.id} className="hover:cursor-pointer hover">
                                        <th>{index + 1}</th>
                                        <td>{`Boleta_${record.spreadSheetDate}`}</td>
                                        <td>
                                            <button className="btn btn-active btn-primary" onClick={()=>{
                                                setModalDetails(record);
                                                document.getElementById("detailsModal").showModal();
                                            }}>
                                                Detalles
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TablePayments