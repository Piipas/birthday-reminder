"use server";

import { createServerAction } from "zsa";
import { NewBirthday } from "../schemas/new-birthday";
import { db } from "@/config/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/config/auth";
import { headers } from "next/headers";

const newBirthdayAction = createServerAction()
  .input(NewBirthday)
  .handler(async ({ input }) => {
    try {
      const session = await auth.api.getSession({ headers: await headers() });

      if (!session?.user?.id) {
        revalidatePath("/");
        return;
      }

      const createdBirthday = await db.birthday.create({
        data: {
          name: input.name,
          date: new Date(input.date.toISOString()),
          User: {
            connect: { id: session.user.id },
          },
        },
      });
      console.log(createdBirthday);
      revalidatePath("/");
    } catch (error) {
      console.log(error);
    }
  });

export default newBirthdayAction;
