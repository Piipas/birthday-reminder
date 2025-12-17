import { transporter } from "@/config/nodemailer";
import { db } from "@/config/prisma";
import { Birthday, User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  if (request.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`)
    return NextResponse.json({ error: "Forbidden", status: 403 }, { status: 403 });

  try {
    const today = new Date();

    const todayBirthdays: Array<Birthday & User & { personname: string }> = await db.$queryRaw`
      SELECT b.date, b.name AS personname, u.name, u.email
      FROM "Birthday" b
      LEFT JOIN "user" u ON b."user_id" = u.id
      WHERE 
        EXTRACT(MONTH FROM b.date) = ${today.getMonth() + 1} 
        AND EXTRACT(DAY FROM b.date) = ${today.getDate()}
    `;

    await Promise.all(
      todayBirthdays.map(async (birthday) => {
        await transporter.sendMail({
          html: `Hi ${birthday.name}, today is ${birthday.personname}'s birthday. Don't forget to wish him/her a great birthday!`,
          to: birthday.email,
          sender: "Birthday Reminder",
          subject: `${birthday.personname}'s birthday!`,
        });
      }),
    );

    return NextResponse.json({ data: "Emails sent." }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong!", status: 500 }, { status: 500 });
  }
}
