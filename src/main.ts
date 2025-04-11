import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as http from 'http';
import * as httpProxy from 'http-proxy';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const expressApp = express();
  expressApp.use(cookieParser());

  // 👇 ExpressAdapter로 감싸서 전달
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  //Cors 설정 부분
  app.enableCors({
    origin: [
      'https://wego-travel.vercel.app',
      'https://www.wego-travel.click',
      'https://wego-travel.click',
      'http://localhost:3000',
    ],
    credentials: true,
  });

  // BE 에서 api 로 콜백 등록해주셔서 전체 적용 (nextjs 코드 변경 최소화도 유도)
  app.setGlobalPrefix('api');

  // swagger 관련 설정
  const config = new DocumentBuilder()
    .setTitle('Wego BFF API')
    .setDescription('소셜 로그인, 인증, 기타 기능에 대한 API 문서')
    .setVersion('1.0')
    .addCookieAuth('accessToken')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.init();

  const proxy = httpProxy.createProxyServer({
    target: process.env.SPRING_URL,
    changeOrigin: true,
    ws: true,
  });

  const server = http.createServer(expressApp);

  server.on('upgrade', (req, socket, head) => {
    if (req.url?.startsWith('/ws/chat')) {
      const cookieHeader = req.headers.cookie;
      const tokenMatch =
        cookieHeader?.match(/accessToken=([^;]+)/) ||
        cookieHeader?.match(/access_token=([^;]+)/);

      const accessToken = tokenMatch ? tokenMatch[1] : null;

      if (accessToken) {
        req.headers['authorization'] = `Bearer ${accessToken}`;
      }

      proxy.ws(req, socket, head);
    }
  });

  server.listen(process.env.PORT ?? 8080);
}

void bootstrap();
