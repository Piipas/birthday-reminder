import { Birthday } from "@prisma/client";
import daysUntilBirthday from "./days-until-birthday";

function sortByClosestBirthday(data: Birthday[]): Birthday[] {
  return data.sort((a, b) => {
    // Convert the birthday strings to Date objects
    const birthdayA = new Date(a.date);
    const birthdayB = new Date(b.date);

    // Use the provided daysUntilBirthday function to compare
    const daysA = daysUntilBirthday(birthdayA);
    const daysB = daysUntilBirthday(birthdayB);

    return daysA - daysB;
  });
}

export default sortByClosestBirthday;
