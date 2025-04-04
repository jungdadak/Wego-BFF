import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { TrendingModule } from './trending/trending.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';
import { TokenMiddleware } from './auth/token.middleware';
<<<<<<< Updated upstream
=======
import { PostsModule } from './posts/posts.module';
import { FilterModule } from './filter/filter.module';
>>>>>>> Stashed changes

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static',
    }),
    TrendingModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    HomeModule,
    DetailModule,
<<<<<<< Updated upstream
=======
    PostsModule,
    FilterModule,
>>>>>>> Stashed changes
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 모든 라우트에 미들웨어 적용 하기
    consumer.apply(TokenMiddleware).forRoutes('*');
  }
}
