/**
 * 리퀘스트에 쿠키 타입이 없어서 추가
 */
export interface RequestWithCookies extends Request {
  cookies: {
    [key: string]: string;
    accessToken?: string;
    refreshToken?: string;
  };
}
