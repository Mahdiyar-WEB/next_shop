const toLocalDate = (date: string) => {
  const d = new Date(date);

  const datePart = d.toLocaleDateString("fa-IR");
  const timePart = d.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return `${timePart} ${datePart}`;
};

export default toLocalDate;
