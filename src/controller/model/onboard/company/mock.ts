import {
  ICompanyRegisterDTO,
  ICompanyViewDTO,
} from '@model/onboard/company/index';

export const MockCompany: ICompanyViewDTO = {
  name: 'Company name',
  domain: 'john.smith.com',
  addressLine1: 'Address line 1',
  addressLine2: 'Address line 2',
  contactFirstName: 'John',
  contactLastName: 'Smith',
  contactEmail: 'john@smith.com',
  contactPhone: '+1234567890',
};

export const DefaultCompany: ICompanyRegisterDTO = {
  name: null,
  domain: null,
  addressLine1: null,
  addressLine2: null,
  contactFirstName: null,
  contactLastName: null,
  contactEmail: null,
  contactPhone: null,
};
