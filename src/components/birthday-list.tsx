import formatDate from "@/lib/utils/format-data";
import daysUntilBirthday from "@/lib/utils/days-until-birthday";
import ageOnNextBirthday from "@/lib/utils/age-on-next-birthday";
import nextBirthdayDate from "@/lib/utils/next-birthday-date";
import { db } from "@/config/prisma";
import DeleteButton from "./delete-button";
import { CalendarDays } from "lucide-react";

const BirthdayList = async () => {
  const birthdayList = await db.birthday.findMany();

  return (
    <div className="space-y-3">
      {birthdayList.length ? (
        birthdayList.map((birthday) => {
          const birthdayDate = new Date(birthday.date);
          return (
            <div className="group rounded-lg px-4 py-6 bg-gray-100 shadow-md flex gap-2" key={birthday.id}>
              <div className="flex-grow">
                <div className="flex gap-2 items-center">
                  <h2 className="text-lg font-medium capitalize">{birthday.name}</h2>
                  <span className="text-gray-600">{ageOnNextBirthday(birthdayDate)} yo</span>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="text-gray-600 text-sm mt-1">{formatDate(nextBirthdayDate(birthdayDate))}</span>
                </div>
              </div>
              <div className="">
                <div className="flex gap-4">
                  <span className="text-sm text-gray-600">{daysUntilBirthday(birthdayDate)} days left</span>
                  <DeleteButton id={birthday.id} />
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center space-y-4 text-gray-400 text-lg border-2 border-dashed border-input py-8">
          <CalendarDays size={70} className="mx-auto" />
          <div>No birthdays added yet&apos;</div>
        </div>
      )}
    </div>
  );
};

export default BirthdayList;
