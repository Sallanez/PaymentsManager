import z from "zod";

const MAX_FILE_SIZE = 400000;
const ACCEPTED_FILE_TYPES = ["csv"];

export const fileRegistrationSchema = z.object({
  profileCsv: z
    .any()
    .refine((files) => files?.length == 1, "File is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "only .csv files are accepted."
    ),
});
