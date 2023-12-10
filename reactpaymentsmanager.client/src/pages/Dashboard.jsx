import TableDashboard from "../components/dashboard/TableDashboard"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { fileRegistrationSchema } from "../schemas/files/fileSchema";
import { uploadSpreedSheetFileRequest,getAllSpreedSheetFilesRequest,getFileExampleRequest } from "../api/files";
import { useUserCredencials } from "../store/userAuth";
import { useSpreedSheetFiles } from "../store/spreedSheetFiles";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {

  const setSpreedSheetFiles = useSpreedSheetFiles((state)=>state.setSpreedSheetFiles);
  const addSpreadSheetFile = useSpreedSheetFiles((state)=>state.addSpreadSheetFile);
  const spreedSheetFiles = useSpreedSheetFiles((state)=>state.spreedSheetFiles);
  const userCredencials = useUserCredencials((state)=>state.userCredencials);
  
  useEffect(()=>{
        getAllSpreedSheetFilesRequest(userCredencials.token)
        .then((response)=>{
          console.log("useEffect")
          console.log(response)
            setSpreedSheetFiles(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[userCredencials.token,setSpreedSheetFiles])


  const {register,handleSubmit,formState:{errors}} = useForm({
        zodResolver: zodResolver(fileRegistrationSchema),
    });

    const SubmitHandler = async (file) => {
      try{
        const formData = new FormData();
        formData.append("file",file.csvFile[0]);
        const res = await uploadSpreedSheetFileRequest(formData,userCredencials.token);
        if(res.status === 200){
          console.log("handler")
          console.log(res)
          addSpreadSheetFile(res.data.blod);
          console.log("Dashboard")
          for(let file of spreedSheetFiles){
            console.log(file)
          }
          console.log("Dashboard")
          toast.success("Archivo cargado");
          document.getElementById('modalForm').close();
        }
      }catch(error){
        console.log(error);
        toast.error("Error al cargar el archivo");
      }
    };

    const handleDownloadExample = async () => {
      try {
        const response = await getFileExampleRequest(userCredencials.token);
        
        const blob = new Blob([response.data.filePath], { type: 'text/csv' });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'example.csv'); 
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl); 
      } 
      catch (error) {
        console.error('Error downloading the example file:', error);
        toast.error('Error al descargar el ejemplo');
      } 
    }

  return (
    <div className="flex flex-col">
      <section className="flex flex-row justify-end my-8">
        {/* Modal Controller */}
        <button className="btn btn-primary" onClick={()=>document.getElementById('modalForm').showModal()}>Cargar Archivo</button>
        <dialog id="modalForm" className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Cargar archivo .csv</h3>
            <div className="my-2">
              <p className="text-sm">Puedes usar este ejemplo como guia: <span href="#!" className="cursor-pointer hover:text-red-300" onClick={handleDownloadExample}>ejemplo.csv</span></p>
            </div>
            <div className="flex justify-center mt-2 modal-action">
              <form className="flex flex-col items-center w-full" method="dialog" onSubmit={handleSubmit(SubmitHandler)}>
                <div>
                  <label className="label">
                    <span className="label-text">Seleccionar Archivo</span>
                  </label>
                  <input type="file" className="w-full max-w-xs file-input file-input-bordered file-input-primary" {...register("csvFile",{required:true})} />
                  {
                    errors.csvFile && <span className="mt-2 text-xs text-error">.csv file is required</span>
                  }
                </div>
                <div className="flex justify-end w-2/3 gap-4 mt-4">
                  <button type="button" className="btn btn-secondary" onClick={()=>document.getElementById('modalForm').close()}>Cancelar</button>
                  <button type="submit" className="btn btn-primary">Subir</button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </section>
      <section>
        <div className="flex justify-center">
          <TableDashboard/>
        </div>
      </section>
    </div>
  )
}

export default Dashboard