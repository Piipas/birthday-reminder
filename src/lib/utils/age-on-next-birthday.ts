function ageOnNextBirthday(birthday: Date) {
  const today = new Date();
  const currentYear = today.getFullYear();

  // Get birth year, month, and day
  const birthYear = birthday.getFullYear();
  const birthMonth = birthday.getMonth();
  const birthDay = birthday.getDate();

  // Set next birthday's date
  const nextBirthday = new Date(currentYear, birthMonth, birthDay);

  // If birthday has passed this year, use next year
  if (nextBirthday < today) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  return nextBirthday.getFullYear() - birthYear;
}

export default ageOnNextBirthday;
