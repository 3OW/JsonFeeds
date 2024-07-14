import { NestFactory } from '@nestjs/core';
import { RssModule } from './rss.module';

async function bootstrap() {
  const app = await NestFactory.create(RssModule);
  await app.listen(3000);
}
bootstrap();
