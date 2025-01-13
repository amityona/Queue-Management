import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QueueManagementController } from './queue-management.controller';
import { QueueManagementService } from './queue-management.service';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UtilsModule,
  ],
  controllers: [QueueManagementController],
  providers: [QueueManagementService],
})
export class QueueManagementModule {}
