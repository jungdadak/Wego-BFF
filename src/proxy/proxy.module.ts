import { Module } from '@nestjs/common';
import { FallbackProxyController } from './proxy.controller';

@Module({
  controllers: [FallbackProxyController],
})
export class ProxyModule {}
