import { Injectable, RequestTimeoutException } from '@nestjs/common';

@Injectable()
export class UtilsService {
  /**
   * Runs a promise with a timeout
   * @param promise The promise to execute
   * @param timeoutMs Timeout in milliseconds
   * @param errorMessage Custom error message for timeout
   * @returns Promise result or throws error on timeout
   */
  async runWithTimeout<T>(
    promise: Promise<T>,
    timeoutMs: number = +process.env.TIMEOUT_MS || 1000,
    errorMessage: string = 'Operation timed out',
  ): Promise<T> {
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new RequestTimeoutException(errorMessage));
      }, timeoutMs);
    });

    return Promise.race([promise, timeoutPromise]);
  }
}
