import jwt_decode from 'jwt-decode';

const MS_LOGIN = 'https://login.microsoftonline.com/';
const CHINA_LOGIN = 'https://login.chinacloudapi.cn/';
const ISSUING_PROVIDERS = {
  Unknown: 'unknown',
  AAD: 'aad',
  B2C: 'b2c',
  IEF: 'ief',
  Google: 'google',
  MSA: 'msa',
};

export interface IJwt {
  encodedToken?: string;
  issuingProvider?: string;
}

export class Jwt implements IJwt {
  constructor(encodedToken?: string) {
    this.encodedToken = encodedToken || '';
    try {
      this.decodedHeader = jwt_decode(this.encodedToken, { header: true });
      this.decodedClaims = jwt_decode(this.encodedToken.trim());
      const parts = this.encodedToken.split('.');
      this.encodedHeader = parts[0];
      this.encodedClaims = parts[1];
      this.encodedSignature = parts[2];
      this.hasSignature = parts.length === 3 && parts[2];
      this.issuingProvider = this.getIssuingProvider(this.decodedClaims);
    } catch (err) {
      // console.log(err);
    }
  }

  encodedToken?: string;

  private decodedHeader?: Record<string, any>;

  decodedClaims?: Record<string, any>;

  encodedHeader?: string;

  encodedClaims?: string;

  encodedSignature?: string;

  hasSignature?: string | boolean;

  issuingProvider?: string;

  isProviderB2C = (decodedClaims: Record<string, any>) => {
    const iss = 'iss';
    const tfp = 'tfp';
    const acr = 'acr';
    const b2cPolicyPrefix = 'b2c_1_';

    let issValue = decodedClaims[iss];
    if (!issValue) return '';

    issValue = issValue.toLowerCase();
    const tfpValue = decodedClaims[tfp];
    const acrValue = decodedClaims[acr];

    return (
      ((issValue.indexOf(MS_LOGIN) === 0 || issValue.match(/https:\/\/[^./]*\.b2clogin.com\//gi)) &&
        issValue.indexOf('2.0') > -1 &&
        ((tfpValue && tfpValue.toLowerCase().indexOf(b2cPolicyPrefix) === 0) ||
          (acrValue && acrValue.toLowerCase().indexOf(b2cPolicyPrefix) === 0))) ||
      ((issValue.indexOf(CHINA_LOGIN) === 0 ||
        issValue.match(/https:\/\/[^./]*\.b2clogin.cn\//gi)) &&
        issValue.indexOf('2.0') > -1 &&
        ((tfpValue && tfpValue.toLowerCase().indexOf(b2cPolicyPrefix) === 0) ||
          (acrValue && acrValue.toLowerCase().indexOf(b2cPolicyPrefix) === 0)))
    );
  };

  isProviderIEF = (decodedClaims: Record<string, any>) => {
    const iss = 'iss';
    const tfp = 'tfp';
    const acr = 'acr';
    const iefPolicyPrefix = 'b2c_1a_';

    let issValue = decodedClaims[iss];
    if (!issValue) return '';

    issValue = issValue.toLowerCase();
    const tfpValue = decodedClaims[tfp];
    const acrValue = decodedClaims[acr];

    return (
      ((issValue.indexOf(MS_LOGIN) === 0 || issValue.match(/https:\/\/[^./]*\.b2clogin.com\//gi)) &&
        issValue.indexOf('2.0') > -1 &&
        ((tfpValue && tfpValue.toLowerCase().indexOf(iefPolicyPrefix) === 0) ||
          (acrValue && acrValue.toLowerCase().indexOf(iefPolicyPrefix) === 0))) ||
      ((issValue.indexOf(CHINA_LOGIN) === 0 ||
        issValue.match(/https:\/\/[^./]*\.b2clogin.cn\//gi)) &&
        issValue.indexOf('2.0') > -1 &&
        tfpValue &&
        tfpValue.toLowerCase().indexOf(iefPolicyPrefix) === 0) ||
      (acrValue && acrValue.toLowerCase().indexOf(iefPolicyPrefix) === 0)
    );
  };

  isProviderAAD = (decodedClaims: Record<string, any>) => {
    const iss = 'iss';
    let issValue = decodedClaims[iss];
    if (!issValue) return '';
    issValue = issValue.toLowerCase();

    return (
      issValue.indexOf('https://login.microsoftonline.com/') === 0 ||
      issValue.indexOf('https://sts.windows.net/') === 0 ||
      issValue.indexOf('https://login.windows.net/') === 0 ||
      issValue.indexOf('https://login.microsoft.com/') === 0 ||
      issValue.indexOf('https://login.microsoft.com/') === 0
    );
  };

  isProviderGoogle = (decodedClaims: Record<string, any>) => {
    const iss = 'iss';
    let issValue = decodedClaims[iss];
    if (!issValue) return '';
    issValue = issValue.toLowerCase();

    return (
      issValue.indexOf('accounts.google.com') === 0 ||
      issValue.indexOf('https://accounts.google.com') === 0
    );
  };

  getIssuingProvider = (decodedClaims: Record<string, any>) => {
    if (this.isProviderB2C(decodedClaims)) return ISSUING_PROVIDERS.B2C;
    if (this.isProviderIEF(decodedClaims)) return ISSUING_PROVIDERS.IEF;
    if (this.isProviderAAD(decodedClaims)) return ISSUING_PROVIDERS.AAD;
    if (this.isProviderGoogle(decodedClaims)) return ISSUING_PROVIDERS.AAD;
    return ISSUING_PROVIDERS.Unknown;
  };
}
