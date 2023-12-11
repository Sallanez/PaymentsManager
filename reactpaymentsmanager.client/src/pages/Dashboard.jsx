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
  const userCredencials = useUserCredencials((state)=>state.userCredencials);
  
  useEffect(()=>{
        getAllSpreedSheetFilesRequest(userCredencials.token)
        .then((response)=>{
            setSpreedSheetFiles(response.data);
        })
        .catch((error)=>{
            console.error(error);
        })
    },[userCredencials.token,setSpreedSheetFiles])


  const {register,handleSubmit,formState:{errors},reset} = useForm({
        zodResolver: zodResolver(fileRegistrationSchema),
        defaultValues:{
          csvFile:null
        }
    });

    const SubmitHandler = async (file) => {
      try{
        const formData = new FormData();
        formData.append("file",file.csvFile[0]);
        const res = await uploadSpreedSheetFileRequest(formData,userCredencials.token);
        if(res.status === 200){
          addSpreadSheetFile(res.data.blod);
          reset();
          toast.success("Archivo cargado");
          document.getElementById('modalForm').close();
        }
      }catch(error){
        console.error(error);
        toast.error("Error al cargar el archivo");
      }
    };

    const handleDownloadExample = async () => {
      try {
        const response = await getFileExampleRequest(userCredencials.token);
        const downloadUrl = response.data.filePath;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'example_paymment.xlsx');
        link.setAttribute('target', '_self'); 
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
        toast.success('Descarga iniciada.');
      }catch (error) {
        console.error('Error downloading the example file:', error);
        toast.error('Error al descargar el ejemplo');
      }
    }

  return (
    <div className="flex flex-col">
      <section className="flex flex-row justify-end my-8">
        {/* Modal Controller */}
        <button className="btn btn-primary" onClick={()=>{
          document.getElementById('modalForm').showModal()
          reset();
        }}>Cargar Archivo</button>
        <dialog id="modalForm" className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Cargar archivo .csv</h3>
            <div className="my-2">
              <p className="text-sm text-center md:text-left">Puedes usar este ejemplo como guia: <span href="#!" className="ml-2 cursor-pointer btn btn-prima" onClick={handleDownloadExample}>ejemplo.xlsx</span></p>
              <p className="my-2 text-sm text-center md:text-left">Después de editarlo, recuerda guardar el archivo en formato .csv</p>
            </div>
            <div className="flex justify-center mt-2 modal-action">
              <form className="flex flex-col items-center w-full" method="dialog" onSubmit={handleSubmit(SubmitHandler)}>
                <div>
                  <label className="label">
                    <span className="label-text">Seleccionar Archivo</span>
                  </label>
                  <input type="file" className="w-full max-w-xs file-input file-input-bordered file-input-primary" {...register("csvFile",{required:true})} />
                  {
                    errors.csvFile && <span className="mt-2 text-xs text-error">.csv archivo es requerido</span>
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