import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class OnApplicationShutdownHook implements OnApplicationShutdown {
  private readonly logger = new Logger('OnApplicationShutdownHook');
  async onApplicationShutdown() {
    this.logger.log('Disconnecting from MongoDB...');
    await mongoose.disconnect();
    this.logger.log('Disconnected from MongoDB.');
  }
}
