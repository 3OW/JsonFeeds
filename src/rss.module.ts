import { Module } from '@nestjs/common';
import { RssController } from './rss.controller';
import { RssService } from './rss.service';
import { ConfigModule } from '@nestjs/config';
import { serviceConfig } from './config/service-config';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpClientService } from './http-client/client.service';
import { RssCronjobService } from './rss.cronjob';
import { feedConfig } from './config/feed-config';
import { JsonToRssMapper } from './mapper/json-to-rss.mapper';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serviceConfig, feedConfig],
      cache: true,
      isGlobal: true,
    }),
    CacheModule.register(),
  ],
  controllers: [RssController],
  providers: [
    HttpClientService,
    JsonToRssMapper,
    RssCronjobService,
    RssService,
  ],
})
export class RssModule {}
