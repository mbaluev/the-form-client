export interface ILanguageItem {
  title: string;
  items: {
    title: string;
    code: string;
    languages: {
      title: string;
      code: string;
    }[];
  }[];
}
