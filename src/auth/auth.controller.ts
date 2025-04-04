import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { nanoid } from 'nanoid';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithCookies } from '../types/req.types';
import { SpringApiService } from '../lib/clients/spring.axios.service';
import axios from 'axios';
import { extractAccessToken } from '../lib/utils/extractAccessToken';

@ApiTags('Auth')
@Controller('user')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly springApiService: SpringApiService,
  ) {}

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
    console.log('=== API/USER/ME 요청 시작 ===');
    console.log('요청 헤더 Authorization:', req.headers['authorization']);

    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader) {
        console.warn('Authorization 헤더 없음 (미들웨어 작동 안 함?)');
        return res.status(401).json({
          message: 'Authorization 헤더가 없습니다.',
        });
      }
      console.log(
        '[Controller] Authorization 헤더 확인:',
        req.headers['authorization'],
      );

      console.log('Spring API 호출 시작');
      const springRes = await this.springApiService
        .toSpring()
        .get('/api/user/me', {
          headers: {
            Authorization: authHeader,
          },
        });

      console.log('Spring API 응답 상태:', springRes.status);

      const user = await springRes.data;
      console.log('유저 정보 성공적으로 수신:', user);

      return res.status(200).json({
        kakaoId: user.kakaoId,
        nickname: user.nickname,
        email: user.email,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Spring 인증 실패:', {
          status: err.response?.status,
          message: err.response?.data || err.message,
        });

        return res.status(err.response?.status || 500).json({
          message: 'Spring 인증 실패',
          details: err.response?.data || err.message,
        });
      }

      console.error('네트워크 에러:', err);
      return res.status(500).json({
        message: '유저 정보 불러오기 실패',
        error: err instanceof Error ? err.message : err,
      });
    }
  }

  @Post('logout')
  async handleLogout(@Req() req: RequestWithCookies, @Res() res: Response) {
    console.log('=== API/USER/LOGOUT 요청 시작 ===');
    console.log('요청 쿠키:', req.cookies);

    const accessToken = extractAccessToken(req);
    console.log('Access Token 확인됨');

    try {
      console.log('Spring API 로그아웃 호출 시작');
      await this.springApiService.postLogout(accessToken);
      console.log('로그아웃 성공');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Spring 로그아웃 실패:', {
          status: err.response?.status,
          errorText: err.response?.data,
        });

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        return res.status(err.response?.status || 500).json({
          message: 'Spring 로그아웃 실패',
          details: err.response?.data || err.message,
        });
      }

      console.error('네트워크 에러:', err);
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      return res.status(500).json({
        message: '로그아웃 처리 실패',
        error: err instanceof Error ? err.message : err,
      });
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return res.status(200).json({ message: '로그아웃 성공' });
  }
}
