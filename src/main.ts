import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // BE 에서 api 로 콜백 등록해주셔서 전체 적용 (nextjs 코드 변경 최소화도 유도)
  app.setGlobalPrefix('api');

  // swagger 관련 설정
  const config = new DocumentBuilder()
    .setTitle('Wego BFF API')
    .setDescription('소셜 로그인, 인증, 기타 기능에 대한 API 문서')
    .setVersion('1.0')
    .addCookieAuth('access_token') // 쿠키 기반 인증이면
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 8080);
  app.use(cookieParser());

  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://wego-travel.vercel.app'
        : 'http://localhost:3000',
    credentials: true,
  });
}
bootstrap();
