import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getKakaoRedirectURL(state: string): string {
    const KAKAO_REST_API = process.env.KAKAO_REST_API;
    const CALLBACK_PATH = process.env.CALLBACK_PATH;
    const FE_URI = process.env.FE_URI;

    if (!KAKAO_REST_API || !CALLBACK_PATH || !FE_URI) {
      throw new Error('ENV 체크 필요');
    }

    const REDIRECT_URI = `${FE_URI}${CALLBACK_PATH}`;

    const kakaoAuthURL = new URL('https://kauth.kakao.com/oauth/authorize');

    kakaoAuthURL.searchParams.append('client_id', KAKAO_REST_API);
    kakaoAuthURL.searchParams.append('redirect_uri', REDIRECT_URI);
    kakaoAuthURL.searchParams.append('response_type', 'code');
    kakaoAuthURL.searchParams.append('state', state);

    return kakaoAuthURL.toString();
  }
}
