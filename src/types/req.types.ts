import { Request as ExpressRequest } from 'express'; // ✅ 정확한 Request 타입 import
/**
 * 리퀘스트에 쿠키 타입이 없어서 추가
 */
export interface RequestWithCookies extends ExpressRequest {
  cookies: {
    [key: string]: string;
    accessToken?: string;
    refreshToken?: string;
  };
}
