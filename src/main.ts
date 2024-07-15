import { NestFactory } from '@nestjs/core';
import { RssModule } from './rss.module';

async function bootstrap() {
  const app = await NestFactory.create(RssModule);
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 80);
}
bootstrap();
