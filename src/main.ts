import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

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
    .addCookieAuth('accessToken') // 쿠키 기반 인증이면
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
