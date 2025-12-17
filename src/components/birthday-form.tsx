"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { NewBirthday } from "@/lib/schemas/new-birthday";
import { Calendar } from "./ui/calendar";
import newBirthdayAction from "@/lib/actions/new-birthday";
import { useServerAction } from "zsa-react";

const BirthdayForm = () => {
  const { isPending, execute } = useServerAction(newBirthdayAction);

  const form = useForm<z.infer<typeof NewBirthday>>({
    resolver: zodResolver(NewBirthday),
    defaultValues: {
      name: "",
      date: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof NewBirthday>) {
    const [, error] = await execute(values);
    if (error) console.error("client error:", error);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Name</FormLabel>
              <FormControl>
                <Input placeholder="Pipas" className="py-6 text-lg" {...field} />
              </FormControl>
              <FormDescription hidden></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Date</FormLabel>
              <FormControl>
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                  captionLayout="dropdown-buttons"
                  fromYear={new Date().getFullYear() - 150}
                  toDate={new Date()}
                  className="h-full w-full flex text-3xl border border-input rounded-md bg-white"
                  classNames={{
                    months: "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
                    month: "space-y-4 w-full flex flex-col",
                    table: "w-full h-full border-collapse space-y-1",
                    head_row: "",
                    row: "w-full mt-2",
                  }}
                />
              </FormControl>
              <FormDescription hidden />
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" size={"lg"} disabled={isPending}>
          {isPending ? "Adding Birthday..." : "Add Birthday"}
        </Button>
      </form>
    </Form>
  );
};

export default BirthdayForm;
