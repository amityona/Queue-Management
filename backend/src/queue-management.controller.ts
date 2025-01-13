import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  RequestTimeoutException,
  Res,
} from '@nestjs/common';
import { QueueManagementService } from './queue-management.service';
import { QueueManagementPushQueueDto } from './dto/queue-management-push-queue.dto';
import { QueueManagementGetAllQueuesInfoDto } from './dto/queue-management-get-all-queues-info.dto';
import { GeneralResponseDto } from './dto/general.dto';
import { Response } from 'express';
@Controller('api')
export class QueueManagementController {
  constructor(
    private readonly queueManagementService: QueueManagementService,
  ) {}

  //Get all queues and waiting messages
  @Get('queues')
  async getAllQueuesAndWaitingMessages(): Promise<
    QueueManagementGetAllQueuesInfoDto[]
  > {
    return await this.queueManagementService.runWithTimeoutWrapper(
      this.queueManagementService.getAllQueuesAndWaitingMessages(),
      +process.env.TIMEOUT_MS || 1000,
    );
  }

  //Get message from queue
  //Customer Timeout
  @Get(':queueName')
  async getQueueMessage(
    @Res() res: Response,
    @Param('queueName') queueName: string,
    @Query('timeout') timeout: number = 1000,
  ): Promise<string | Response> {
    try {
      const nextMessage =
        await this.queueManagementService.runWithTimeoutWrapper(
          this.queueManagementService.getQueueMessage(queueName),
          timeout,
        );
      return res.status(200).send(nextMessage);
    } catch (err) {
      if (err instanceof RequestTimeoutException) {
        return res.status(204).send('No message found');
      }
      throw err;
    }
  }

  //Push message to queue
  @Post()
  async pushQueue(
    @Body() body: QueueManagementPushQueueDto,
  ): Promise<GeneralResponseDto> {
    return await this.queueManagementService.runWithTimeoutWrapper(
      this.queueManagementService.addMessageToQueue(
        body.queueName,
        body.message,
      ),
      +process.env.TIMEOUT_MS || 1000,
    );
  }
}
