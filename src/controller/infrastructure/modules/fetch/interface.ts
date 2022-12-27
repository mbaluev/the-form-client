export interface IFetchApiModule {
  get: (url: string) => Promise<any>;
}
