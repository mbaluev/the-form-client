export const isJsonValid = (str?: string) => {
  if (!str) return false;
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
