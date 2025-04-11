import { All, Controller, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import {
  createProxyAxiosInstance,
  CustomAxiosRequestConfig,
} from '../lib/clients/proxy.axios';

@Controller() // 전체 API 프리픽스
export class FallbackProxyController {
  @All('*')
  async proxy(@Req() req: Request, @Res() res: Response) {
    // 기존에 컨트롤러가 처리하는 경로들은 제외
    const excludedRoutes = [
      /^\/api\/user/,
      /^\/api\/detail/,
      /^\/api\/trending/,
      /^\/api\/posts/,
      /^\/api\/filter/,
    ];
    const path = req.originalUrl;
    if (excludedRoutes.some((regex) => regex.test(path))) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Handled by specific controller' });
    }

    // 클라이언트의 refreshToken은 쿠키에서 읽어옵니다.
    const refreshToken = req.cookies?.refreshToken;
    // 전용 Axios 인스턴스 생성
    const client = createProxyAxiosInstance(refreshToken);

    try {
      const response = await client.request({
        method: req.method,
        url: req.originalUrl, // 필요한 경우 URL 재매핑 로직 추가 가능
        headers: {
          ...req.headers,
          host: undefined,
        },
        data: req.body,
        params: req.query,
        // responseType: 'stream',
      });

      const customConfig = response.config as CustomAxiosRequestConfig;
      if (customConfig._newAccessToken) {
        res.cookie('accessToken', customConfig._newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          path: '/',
          maxAge: 1000 * 60 * 65,
        });
      }

      res.status(response.status);
      // Spring 백엔드의 응답 스트림을 클라이언트로 그대로 전달
      res.json(response.data);
    } catch (error) {
      if (error.code) console.error('[PROXY] 오류 코드:', error.code);
      if (error.request)
        res.status(error?.response?.status || 500).json({
          message: '프록시 요청 실패',
          error: error?.response?.data || error?.message,
        });
    }
  }
}
