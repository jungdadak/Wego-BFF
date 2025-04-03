import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { nanoid } from 'nanoid';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithCookies } from '../types/req.types';

@ApiTags('Auth')
@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * 카카오로 유저를 리디렉션 하는 컨트롤러.
   * nanoid 로 state 생성 후 카카오 Oauth URL 로 리디렉션.
   * @param res
   */
  @Get('kakao/authorize')
  async redirectToKakao(@Res() res: Response) {
    try {
      const state = nanoid();

      res.cookie('kakao_auth_state', state, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 300000,
      });
      console.log('[authorize] state:', state);
      console.log('[authorize] 쿠키 설정 완료');

      const kakaoURL = this.authService.getKakaoRedirectURL(state);
      return res.redirect(kakaoURL);
    } catch (err) {
      console.error('카카오 인증 URL 생성 오류:', err);

      //todo: next.js 에서 message 필드에 따른 Toast
      return res.status(500).json({
        message: '인증 처리 중 오류가 발생했습니다.',
      });
    }
  }

  /**
   * Kakao 에서 유저 리디렉션시 작동하는 엔드포인트
   * 1. state 검증
   * 2. code spring 전송
   * 3. 유저 토큰장착, 정보는 서치파라미터에 달아서 FE 로 푸시
   * @param state
   * @param code
   * @param req
   * @param res
   */
  @Get('kakao/callback')
  async handleKakaoCallback(
    @Query('state') state: string,
    @Query('code') code: string,
    @Req() req: RequestWithCookies,
    @Res() res: Response,
  ) {
    const FE_URL = process.env.FE_URL ?? 'http://localhost:3000/';
    console.log('콜백 시작');
    if (!code || !state) {
      return res.status(500).json({
        message: '서버 오류가 발생했습니다.',
      });
    }
    // cookies:cookie-parser 미들웨어가 제공하는 어트리뷰트
    const userState = req.cookies['kakao_auth_state'];

    // CSRF 기초 방어를 위한 state 검증 -> 서비스 호출
    if (!userState || userState !== state) {
      return res.status(400).json({
        message: '유효하지 않은 세션 입니다.',
      });
    }
    res.clearCookie('kakao_auth_state');
    console.log('state 검증 완료');
    /**
     * spring 요청부 -> await 으로 스레드 블로킹
     */
    try {
      const result = await this.authService.exchangeCodeAndGetUserInfo(code);

      // 토큰은 httponly 에 심고
      res.cookie('accessToken', result.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        domain: '.wego-travel.click',
        maxAge: 1000 * 60 * 65, // 토큰 1시간
      });
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/',
        domain: '.wego-travel.click',
        maxAge: 1000 * 60 * 60 * 24 * 7 + 1000, //리프레시 일주일
      });
      console.log('토큰들 장착 완료');
      // 닉네임과 이메일은 쿼리파라미터로 전송하기
      return res.redirect(
        `${FE_URL}/?email=${encodeURIComponent(result.email)}&nickname=${encodeURIComponent(result.nickName)}`,
      );
    } catch (err) {
      // 실패시에도 홈으로 리디렉션
      console.error('Spring 연동 실패:', err);
      console.log('실패 리디렉션', err);
      return res.redirect(`${FE_URL}/?error=login_failed`);
    }
  }

  @Get('me')
  async handleMe(@Req() req: RequestWithCookies, @Res() res: Response) {
    // if (process.env.IS_MOCKING === 'true') {
    //   return res.status(200).json({
    //     kakaoId: 'unknown123',
    //     nickname: 'GUEST',
    //     email: 'guest@example.com',
    //   });
    // }
    console.log('=== API/USER/ME 요청 시작 ===');
    console.log('요청 쿠키:', req.cookies);

    const SPRING_URL = process.env.SPRING_URL;
    console.log('Spring URL:', SPRING_URL);

    try {
      // 여러 쿠키 키 확인
      const accessToken =
        req.cookies['accessToken'] || req.cookies['access_token'];

      console.log('추출된 Access Token:', accessToken ? '존재함' : '없음');

      if (!accessToken) {
        console.warn('인증 토큰 없음');
        return res.status(401).json({
          message: '인증 토큰이 없습니다.',
        });
      }

      console.log('Spring API 호출 시작');
      const springRes = await fetch(`${SPRING_URL}/api/user/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log('Spring API 응답 상태:', springRes.status);

      if (!springRes.ok) {
        const errorText = await springRes.text();
        console.error('Spring 인증 실패:', {
          status: springRes.status,
          errorText,
        });

        return res.status(springRes.status).json({
          message: 'Spring 인증 실패',
          details: errorText,
        });
      }

      const user = await springRes.json();
      console.log('유저 정보 성공적으로 수신:', user);

      return res.status(200).json({
        kakaoId: user.kakaoId,
        nickname: user.nickname,
        email: user.email,
      });
    } catch (err) {
      console.error('네트워크 에러:', err);
      return res.status(500).json({
        message: '유저 정보 불러오기 실패',
        error: err instanceof Error ? err.message : err,
      });
    }
  }
}
