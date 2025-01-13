import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UtilsService } from './utils/utils.service';
import { QUEUES } from './db/queues-structure';
import { Queue } from './db/queue';
import { QueueManagementGetAllQueuesInfoDto } from './dto/queue-management-get-all-queues-info.dto';
import { GeneralResponseDto } from './dto/general.dto';

@Injectable()
export class QueueManagementService {
  constructor(private readonly utilsService: UtilsService) {}

  async addMessageToQueue(
    queueName: string,
    message: string,
  ): Promise<GeneralResponseDto> {
    try {
      if (!QUEUES[queueName]) {
        console.debug(`Queue ${queueName} not found, creating new queue`);
        QUEUES[queueName] = new Queue<string>();
      }

      QUEUES[queueName].insert(message);
      return { message: 'Message added to queue', queue: queueName };
    } catch (err) {
      throw new InternalServerErrorException(
        `Failed to add message to queue ${queueName}`,
      );
    }
  }

  async getAllQueuesAndWaitingMessages(): Promise<
    QueueManagementGetAllQueuesInfoDto[]
  > {
    return Object.entries(QUEUES).map(([queueName, queue]) => ({
      queueName,
      waitingMessages: queue.size(),
    }));
  }

  getQueueSize(queueName: string): number {
    if (!QUEUES[queueName]) {
      throw new NotFoundException(`Queue ${queueName} not found`);
    }
    return QUEUES[queueName].size();
  }

  async getQueueMessage(queueName: string): Promise<string> {
    if (!QUEUES[queueName]) {
      throw new NotFoundException(`Queue ${queueName} not found`);
    }
    if (QUEUES[queueName].size() === 0) {
      throw new NotFoundException(`Queue ${queueName} is empty`);
    }
    return QUEUES[queueName].remove();
  }

  async runWithTimeoutWrapper<T>(
    fn: Promise<T>,
    timeoutMs: number,
  ): Promise<T> {
    return await this.utilsService.runWithTimeout(fn, timeoutMs);
  }
}
