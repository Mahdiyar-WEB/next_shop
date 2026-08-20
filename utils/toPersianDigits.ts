const toPersianDigits = (value: string | number) => {
  const farsiDigits = "۰۱۲۳۴۵۶۷۸۹";

  return String(value).replace(/\d/g, (digit) => farsiDigits[Number(digit)]);
};

export default toPersianDigits;