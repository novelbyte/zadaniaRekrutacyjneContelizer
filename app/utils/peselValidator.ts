export function isValidPesel(pesel: string): boolean {
  if (!/^\d{11}$/.test(pesel)) return false;

  const digits = pesel.split('').map(Number);
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const controlSum = weights.reduce((sum, w, i) => sum + w * digits[i], 0) % 10;
  const controlDigit = (10 - controlSum) % 10;
  if (controlDigit !== digits[10]) return false;

  let year = digits[0] * 10 + digits[1];
  let month = digits[2] * 10 + digits[3];
  const day = digits[4] * 10 + digits[5];

  if (month >= 81 && month <= 92) {
    year += 1800;
    month -= 80;
  } else if (month >= 1 && month <= 12) {
    year += 1900;
  } else if (month >= 21 && month <= 32) {
    year += 2000;
    month -= 20;
  } else if (month >= 41 && month <= 52) {
    year += 2100;
    month -= 40;
  } else if (month >= 61 && month <= 72) {
    year += 2200;
    month -= 60;
  } else {
    return false;
  }

  const d = new Date(year, month - 1, day);
  if (d.getFullYear() !== year || d.getMonth() + 1 !== month || d.getDate() !== day) return false;
  return true;
}
