function daysUntilBirthday(birthday: Date) {
  const today = new Date();
  const currentYear = today.getFullYear();

  // Parse the input date and set it to this year's birthday
  const nextBirthday = new Date(currentYear, birthday.getMonth(), birthday.getDate());

  // If the birthday has already passed this year, use next year
  if (nextBirthday < today) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  // Calculate the difference in days
  const diffTime = nextBirthday.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export default daysUntilBirthday;
