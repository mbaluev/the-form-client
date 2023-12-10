export {};

declare global {
  interface Window {
    Intercom: (first: string, second?: any) => void;
    intercomSettings: any;
    attachEvent: (first: string, second: () => void) => void;
  }
}
