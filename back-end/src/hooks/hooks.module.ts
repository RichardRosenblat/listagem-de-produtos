import { Module } from '@nestjs/common';
import { OnApplicationShutdownHook } from './onApplicationShutdown.service';

@Module({
  providers: [OnApplicationShutdownHook],
})
export class HooksModule {}
