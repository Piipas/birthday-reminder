"use server";

import { db } from "@/config/prisma";
import { revalidatePath } from "next/cache";

const deleteBirthdayAction = async (birthdayId: string) => {
  try {
    await db.birthday.delete({ where: { id: birthdayId } });
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
};

export default deleteBirthdayAction;
