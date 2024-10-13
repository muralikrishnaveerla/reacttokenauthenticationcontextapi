declare module "jwt-decode" {
    interface JwtHeader {
      typ?: string;
      alg?: string;
      kid?: string;
    }
    interface JwtPayload {
      iss?: string;
      sub?: string;
      aud?: string | string[];
      exp?: number;
      nbf?: number;
      iat?: number;
      jti?: string;
    }
    export function jwtDecode<T = JwtPayload>(token: string): T; // Named export
  }
  