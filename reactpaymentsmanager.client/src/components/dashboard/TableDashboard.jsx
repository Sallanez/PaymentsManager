import { toast } from "react-toastify";
import {deleteSpreedSheetFileRequest} from "../../api/files";
import { useUserCredencials } from "../../store/userAuth";
import { useSpreedSheetFiles } from "../../store/spreedSheetFiles";


const TableDashboard = () => {
    const userCredencials = useUserCredencials((state)=>state.userCredencials);
    const setSpreedSheetFiles = useSpreedSheetFiles((state)=>state.setSpreedSheetFiles);
    const spreedSheetFiles = useSpreedSheetFiles((state)=>state.spreedSheetFiles);
    
    console.dir(spreedSheetFiles);
    const DeleteHandler = async (id) => {
        const res = await deleteSpreedSheetFileRequest(id,userCredencials.token);
        if(res.status === 200){
            toast.success("Archivo eliminado");
            setSpreedSheetFiles(spreedSheetFiles.filter((file)=>file.id !== id));
        }else{
            toast.error("Error al eliminar el archivo");
        }
    }

    return (
        <div className="w-2/3 overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Archivo</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        spreedSheetFiles.map((file,index)=>{
                        return (
                                <tr key={file.id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <a className="cursor hover:text-red-300" href={file.filePath} download>
                                        {file.fileName}
                                    </a>
                                    </td>
                                    <td>{file.uploadedAt}</td>
                                    <td>
                                        <button className="btn btn-active btn-secondary" onClick={()=>DeleteHandler(file.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableDashboard