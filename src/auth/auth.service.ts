import { Injectable } from '@nestjs/common';
import { SpringTokenResponseDto } from './dto/spring.token.response.dto';

@Injectable()
export class AuthService {
  /**
   * controller 에서 받은 state 와 함께 서치파라미터 완성하는 서비스
   * @param state
   */
  getKakaoRedirectURL(state: string): string {
    const KAKAO_REST_API = process.env.KAKAO_REST_API;
    const CALLBACK_PATH = process.env.CALLBACK_PATH;
    const BASE_URL = process.env.BASE_URL;

    if (!KAKAO_REST_API || !CALLBACK_PATH || !BASE_URL) {
      throw new Error('ENV 체크 필요');
    }

    const REDIRECT_URI = `${BASE_URL}${CALLBACK_PATH}`;

    const kakaoAuthURL = new URL('https://kauth.kakao.com/oauth/authorize');

    kakaoAuthURL.searchParams.append('client_id', KAKAO_REST_API);
    kakaoAuthURL.searchParams.append('redirect_uri', REDIRECT_URI);
    kakaoAuthURL.searchParams.append('response_type', 'code');
    kakaoAuthURL.searchParams.append('state', state);

    return kakaoAuthURL.toString();
  }

  /**
   * 1. spring 에 인가코드 전송
   * 2. spring 에서 응답값 return
   * @param code
   * @constructor
   */
  async exchangeCodeAndGetUserInfo(
    code: string,
  ): Promise<SpringTokenResponseDto> {
    const SPRING_URL = process.env.SPRING_URL;
    if (!SPRING_URL) {
      throw new Error('ENV 체크하세요');
    }

    try {
      const springRes = await fetch(`${SPRING_URL}/api/user/kakao/callback`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!springRes.ok) {
        const text = await springRes.text();
        throw new Error(`Spring 응답 오류: ${springRes.status} ${text}`);
      }

      // clone()을 사용하여 본문 재사용 가능하게 함
      const responseText = await springRes.clone().text();

      return JSON.parse(responseText);
    } catch (err) {
      throw err;
    }
  }
}
