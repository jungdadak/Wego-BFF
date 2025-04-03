import { Global, Module } from '@nestjs/common';
import { SpringApiService } from './spring.axios.service';

// 모든 리소스가 스프링과 통신하기에 집어넣음
@Global()
@Module({
  providers: [SpringApiService],
  exports: [SpringApiService],
})
export class ClientsModule {}
