import { isJsonValid } from '@utils/json/isJsonValid';

export const jsonParse = (str?: string | null) => {
  if (str && isJsonValid(str)) return JSON.parse(str);
  return undefined;
};
