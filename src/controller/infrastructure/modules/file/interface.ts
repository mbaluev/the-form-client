export interface IFileApiModule {
  get: (url: string) => Promise<string | undefined>;
}
