function nextBirthdayDate(birthday: Date) {
  const today = new Date();
  const currentYear = today.getFullYear();

  // Set next birthday's date for this year
  const nextBirthday = new Date(currentYear, birthday.getMonth(), birthday.getDate());

  // If the birthday has already passed this year, set it for next year
  if (nextBirthday < today) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  return nextBirthday;
}

export default nextBirthdayDate;
