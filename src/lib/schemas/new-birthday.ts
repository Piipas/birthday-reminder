import { z } from "zod";

const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export const NewBirthday = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  date: z.date({ required_error: "A date of birth is required." }),
});
