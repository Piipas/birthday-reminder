function formatDate(date: Date) {
  const formattedDate = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  // Add ordinal suffix
  const day = date.getDate();
  const suffix = ["th", "st", "nd", "rd"][day % 10 > 3 || Math.floor((day % 100) / 10) === 1 ? 0 : day % 10];

  return formattedDate.replace(/\d+/, day + suffix);
}

export default formatDate;
