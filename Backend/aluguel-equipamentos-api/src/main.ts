import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { TypeOrmExceptionFilter } from './shared/filters/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(), new TypeOrmExceptionFilter(httpAdapter));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
