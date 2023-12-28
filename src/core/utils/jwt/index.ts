import jwt_decode from 'jwt-decode';

export interface IJwt {
  encodedToken?: string;
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
    } catch (err) {
      // console.log(err);
    }
  }

  encodedToken?: string;

  decodedHeader?: Record<string, any>;

  decodedClaims?: Record<string, any>;

  encodedHeader?: string;

  encodedClaims?: string;

  encodedSignature?: string;

  hasSignature?: string | boolean;
}
