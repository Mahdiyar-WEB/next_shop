const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

const toEnglishDigits = (value: string) => {
  return value.replace(/[۰-۹]/g, (digit) =>
    String(persianDigits.indexOf(digit)),
  );
};

export default toEnglishDigits;
