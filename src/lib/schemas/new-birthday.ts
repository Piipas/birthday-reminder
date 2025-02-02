import { z } from "zod";

export const NewBirthday = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "A date of birth is required.",
  }),
});
