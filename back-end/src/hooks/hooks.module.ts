import { Module } from '@nestjs/common';
import { OnApplicationShutdownHook } from './onApplicationShutdown.hook';

@Module({
  providers: [OnApplicationShutdownHook],
})
export class HooksModule {}
