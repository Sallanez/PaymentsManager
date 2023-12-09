import TableDashboard from "../components/dashboard/TableDashboard"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { fileRegistrationSchema } from "../schemas/files/fileSchema";

const Dashboard = () => {
  const {register,handleSubmit,formState:{errors}} = useForm({
        resolver: zodResolver(fileRegistrationSchema),
    });

    const SubmitHandler = () => {
        handleSubmit(async (values)=>{
            console.log(values);
        })
    }

  return (
    <>
      <section>
        <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Cargar Archivo</button>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Cargar archivo .csv</h3>
            <div className="flex justify-center modal-action">
              <form method="dialog" onSubmit={SubmitHandler()}>
                <div>
                  <label className="label">
                    <span className="label-text">Archivo</span>
                  </label>
                  <input type="file" className="w-full max-w-xs file-input file-input-bordered file-input-primary" {...register("file",{require:true})} />
                  {
                            errors.file && <span className="mt-2 text-xs text-error">Email is required</span>
                        }
                </div>
                <div className="flex justify-end mt-2">
                  <button type="submit" className="btn">Subir</button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </section>
      <section className="flex justify-around">
        <div className="">
          <TableDashboard/>
        </div>
      </section>
    </>
  )
}

export default Dashboard