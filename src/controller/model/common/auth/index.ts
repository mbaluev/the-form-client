export interface IAccount {
  id?: string;
  companyId?: string;
  companyName?: string;
  name?: string;
  email?: string;
  groups?: string[];
  roles?: string[];
  provider?: TAuthProvider;
  photo?: any;
  expired?: boolean;
}

export type TAuthProvider =
  | 'email'
  | 'facebook'
  | 'google'
  | 'linkedin'
  | 'ms private'
  | 'ms work';

export const AuthInteractionRequiredErrors = [
  'consent_required',
  'interaction_required',
  'login_required',
  'monitor_window_timeout',
];
