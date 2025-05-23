import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as httpProxy from 'http-proxy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Cors 설정 부분
  app.enableCors({
    origin: [
      'https://wego-travel.vercel.app',
      'https://www.wego-travel.click',
      'https://wego-travel.click',
      'http://localhost:3000',
    ],
    credentials: true,
  });

  // API 경로 접두사 설정
  app.setGlobalPrefix('api');

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Wego BFF API')
    .setDescription('소셜 로그인, 인증, 기타 기능에 대한 API 문서')
    .setVersion('1.0')
    .addCookieAuth('accessToken')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // NestJS 서버 시작
  await app.listen(process.env.PORT ?? 8080);

  // NestJS의 HTTP 서버 인스턴스를 올바르게 가져오는 방법
  const httpServer = app.getHttpServer();

  // WebSocket 프록시 설정
  const proxy = httpProxy.createProxyServer({
    target: process.env.SPRING_URL, // Spring 백엔드 URL
    changeOrigin: true,
    ws: true, // WebSocket 활성화
  });

  // WebSocket 연결 처리
  httpServer.on('upgrade', (req, socket, head) => {
    console.log('[WebSocket] 업그레이드 요청 감지:', req.url);
    // WebSocket 경로 확인 (STOMP 프로토콜은 보통 특정 경로로 연결)
    if (req.url?.startsWith('/ws/chat')) {
      console.log('[WebSocket] 채팅 연결 처리 시작');
      // 쿠키에서 토큰 추출
      const cookieHeader = req.headers.cookie;
      console.log('[WebSocket] 쿠키 헤더:', cookieHeader);
      const tokenMatch =
        cookieHeader?.match(/accessToken=([^;]+)/) ||
        cookieHeader?.match(/access_token=([^;]+)/);

      const accessToken = tokenMatch ? tokenMatch[1] : null;
      console.log('[WebSocket] 토큰 추출 여부:', accessToken ? '성공' : '실패');

      // Authorization 헤더에 토큰 추가
      if (accessToken) {
        req.headers['authorization'] = `Bearer ${accessToken}`;
        console.log('[WebSocket] Authorization 헤더 설정 완료');
      }
      console.log('[WebSocket] Spring 서버로 프록시 전송 시작');
      // WebSocket 연결 프록시
      proxy.ws(req, socket, head);
      console.log('[WebSocket] 프록시 요청 전송 완료');
    } else {
      console.log('[WebSocket] 채팅 경로가 아님, 무시됨');
    }
  });

  console.log(`Application running on port ${process.env.PORT ?? 8080}`);
}

bootstrap();
