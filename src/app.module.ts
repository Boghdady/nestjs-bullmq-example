import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

@Module({
  imports: [BullModule.forRoot({
    connection:{
      host: 'localhost',
      port: 6379
    }
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
