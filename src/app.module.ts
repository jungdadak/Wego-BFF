import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrendingModule } from './trending/trending.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './home/home.module';
import { DetailModule } from './detail/detail.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
