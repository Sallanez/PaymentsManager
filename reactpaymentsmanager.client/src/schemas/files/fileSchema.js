import z from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_FILE_TYPES = ['text/csv', 'application/vnd.ms-excel']; 

export const fileRegistrationSchema = z.object({
  profileCsv: z
    .array(z.instanceof(File))
    .nonempty("File is required.")
    .refine((files) => files[0].size <= MAX_FILE_SIZE, { message: "Tamaño máximo 500KB." })
    .refine(
      (files) => {
        const fileType = files[0].type;
        return ACCEPTED_FILE_TYPES.includes(fileType) || files[0].name.endsWith('.csv');
      },
      { message: "Solo se aceptan archivos .csv" }
    ),
});
