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

      await db.birthday.create({
        data: {
          name: input.name,
          date: new Date(input.date),
          User: {
            connect: { id: session.user.id },
          },
        },
      });
      revalidatePath("/");
    } catch (error) {
      console.error(error);
    }
  });

export default newBirthdayAction;
