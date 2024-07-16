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
import { DWToRssMapper } from './mapper/dw.mapper';
import { ScheduleModule } from '@nestjs/schedule';
import { VoToRssMapper } from './mapper/vo.mapper copy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [serviceConfig, feedConfig],
      cache: true,
      isGlobal: true,
    }),
    CacheModule.register(),
    ScheduleModule.forRoot(),
  ],
  controllers: [RssController],
  providers: [
    DWToRssMapper,
    HttpClientService,
    JsonToRssMapper,
    RssCronjobService,
    RssService,
    VoToRssMapper,
  ],
})
export class RssModule {}
