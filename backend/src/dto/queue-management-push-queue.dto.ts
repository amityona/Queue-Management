import { IsNotEmpty, IsString } from 'class-validator';

export class QueueManagementPushQueueDto {
  @IsNotEmpty()
  @IsString()
  queueName: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}
