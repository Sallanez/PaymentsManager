import z from "zod";

//const currentYear = new Date().getFullYear();

export const dateFormSchema = z.object({
    year: z.string()
        .transform((value) => parseInt(value, 10))
        .refine((year) => !isNaN(year), { message: "El año debe ser un número válido." }),
    month: z.string()
        .length(2, { message: "El mes deben ser dos digitos." })
        .regex(/^(0[1-9]|1[0-2])$/, { message: "Mes invalido." })
});
