import { z } from "zod";

const DATE_REGEX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export const NewBirthday = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  date: z
    // .string({
    //   required_error: "A date of birth is required.",
    // })
    // .regex(DATE_REGEX, "Invalid date format (YYYY-MM-DD)")
    // .refine((value) => {
    //   const date = new Date(value + "T00:00:00");
    //   return !isNaN(date.getTime());
    // }, "Invalid calendar date")
    // .refine((value) => {
    //   const date = new Date(value + "T00:00:00");
    //   return date <= new Date();
    // }, "Birthday cannot be in the future")
    // .refine((value) => {
    //   const year = Number(value.slice(0, 4));
    //   return year >= 1900;
    // }, "Year must be 1900 or later")
    // .or(z.date()),
    .date(),
});
