import formatDate from "@/lib/utils/format-data";
import daysUntilBirthday from "@/lib/utils/days-until-birthday";
import { Trash2 } from "lucide-react";
import ageOnNextBirthday from "@/lib/utils/age-on-next-birthday";
import nextBirthdayDate from "@/lib/utils/next-birthday-date";

const BirthdayList = () => {
  const birthdayList = [
    {
      id: 1,
      name: "pipas",
      date: "2001-01-08T00:00:00.000",
    },
    {
      id: 2,
      name: "pipas",
      date: "2001-01-08T00:00:00.000",
    },
    {
      id: 3,
      name: "pipas",
      date: "2001-01-08T00:00:00.000",
    },
  ];

  return (
    <div className="space-y-3">
      {birthdayList.map((birthday) => {
        const birthdayDate = new Date(birthday.date);
        return (
          <div className="group rounded-lg px-4 py-6 bg-gray-100 shadow-lg flex gap-2" key={birthday.id}>
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
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BirthdayList;
