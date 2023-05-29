import { VariantType } from 'notistack';

export const NOTIFY_DURATION = 5000;

export interface INotifyItem {
  guid: string;
  title: string;
  variant: VariantType;
  message?: string;
}
