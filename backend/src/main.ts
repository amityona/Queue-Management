import { NestFactory } from '@nestjs/core';
import { QueueManagementModule } from './queue-management.module';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(QueueManagementModule);
  app.enableCors();
  //app.setGlobalPrefix('/api');
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
