import { toast } from "react-toastify";
import {deleteSpreedSheetFileRequest} from "../../api/files";
import { useUserCredencials } from "../../store/userAuth";
import { useSpreedSheetFiles } from "../../store/spreedSheetFiles";


const TableDashboard = () => {
    const userCredencials = useUserCredencials((state)=>state.userCredencials);
    const setSpreedSheetFiles = useSpreedSheetFiles((state)=>state.setSpreedSheetFiles);
    const spreedSheetFiles = useSpreedSheetFiles((state)=>state.spreedSheetFiles);
    
    const DeleteHandler = async (id) => {
        try{
            await deleteSpreedSheetFileRequest(id,userCredencials.token);
            toast.success("Archivo eliminado");
            setSpreedSheetFiles(spreedSheetFiles.filter((file)=>file.id !== id));
        }catch(error){
            toast.error("Error al eliminar el archivo");
            console.error(error);
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
                        spreedSheetFiles.length > 0 ? (
                            spreedSheetFiles.map((file,index)=>{
                                return (
                                    <tr key={file.id} className="hover:cursor-pointer hover">
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
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">No hay archivos cargados</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableDashboard