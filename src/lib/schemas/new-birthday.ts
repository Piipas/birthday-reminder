import { z } from "zod";

export const NewBirthday = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  date: z.date({ required_error: "A date of birth is required." }),
});
