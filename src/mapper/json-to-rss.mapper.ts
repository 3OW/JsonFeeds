import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { feedConfig, FeedsConfig } from 'src/config/feed-config';
import { FeedConfig } from 'src/types/feed-config';
import { Feed, Item } from 'feed';

@Injectable()
export class JsonToRssMapper {
  constructor() {}

  mapJsonToRss(
    jsonResults: Record<string, string>[],
    feedConfig: FeedConfig,
  ): Feed {
    const feed = new Feed({
      title: feedConfig.mapping.feedTitle,
      link: feedConfig.mapping.baseUri,
      id: feedConfig.name,
      copyright: '',
    });

    if (feedConfig.mapping.filters.length > 0) {
      jsonResults = jsonResults.filter((record) => {
        for (const filter of feedConfig.mapping.filters) {
          if (record[filter.key] === filter.valueToFilterOut) {
            return false;
          }
        }
        return true;
      });
    }
    jsonResults.forEach((record) => {
      const item = this.mapPostsToItems(record, feedConfig);
      feed.addItem(item);
    });

    feed.addCategory('Wohnungen');
    feed.addCategory('Mietangebote');

    return feed;
  }

  mapPostsToItems(
    record: Record<string, string>,
    feedConfig: FeedConfig,
  ): Item {
    console.log('record', record);
    const post: Item = {
      title: record[feedConfig.mapping.title],
      link: `${feedConfig.mapping.baseUri}${record[feedConfig.mapping.url]}`,
      id: record[feedConfig.mapping.uid],
      description: record[feedConfig.mapping.notice] ?? '',
      date: new Date(),
      content: `
      <p><strong>Titel:</strong>  ${record[feedConfig.mapping.title]}</p>
      <p><strong>Bezirk:</strong> ${record[feedConfig.mapping.district]}</p>
      <p><strong>Fläche:</strong> ${record[feedConfig.mapping.area]}</p>
      <p><strong>Miete:</strong> ${record[feedConfig.mapping.rent]}</p>
      <p><strong>Räume:</strong> ${record[feedConfig.mapping.rooms]}</p>
      <p><strong>Beschreibung:</strong> ${record[feedConfig.mapping.notice]}</p>
      <image src="${feedConfig.mapping.imageHasFullUrl ? record[feedConfig.mapping.imageUrl] : feedConfig.mapping.baseUri + record[feedConfig.mapping.imageUrl]}" />
      `,
      image: {
        url: feedConfig.mapping.imageHasFullUrl
          ? `${record[feedConfig.mapping.imageUrl]}`
          : `${feedConfig.mapping.baseUri}${record[feedConfig.mapping.imageUrl]}`,
      },
    };

    console.log('post', post);

    return post;
  }
}
