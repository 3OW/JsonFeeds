import { Controller, Get, Inject, Param } from '@nestjs/common';
import { RssService } from './rss.service';

@Controller()
export class RssController {
  constructor(@Inject(RssService) private readonly rssService: RssService) {}

  @Get('/feed/feedName/:feedName')
  getHello(@Param('feedName') feedName: string): unknown {
    return this.rssService.getFeedFromCache(feedName);
  }
}
