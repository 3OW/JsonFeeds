import { Injectable } from '@nestjs/common';
import { FeedConfig } from 'src/types/feed-config';
import { Feed, Item } from 'feed';

@Injectable()
export class DWToRssMapper {
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

    jsonResults.forEach((record) => {
      const item = this.mapPostsToItems(record, feedConfig);
      feed.addItem(item);
    });

    feed.addCategory('Wohnungen');
    feed.addCategory('Mietangebote');

    return feed;
  }

  mapPostsToItems(
    record: Record<string, string | object>,
    feedConfig: FeedConfig,
  ): Item {
    const imageUrl = `https://immo-api.deutsche-wohnen.com${record.images[0]?.filePath}`;

    const post: Item = {
      title: record[feedConfig.mapping.title] as string,
      link: `https://www.deutsche-wohnen.com/expose/object/${record[feedConfig.mapping.uid]}`,
      id: record[feedConfig.mapping.uid] as string,
      description: record[feedConfig.mapping.title]
        ? (record[feedConfig.mapping.title] as string)
        : '',
      date: new Date(),
      content: `
      <p><strong>Titel:</strong>  ${record[feedConfig.mapping.title]}</p>
      <p><strong>Bezirk:</strong> ${(record['address'] as Record<string, string>)?.district}</p>
      <p><strong>Fläche:</strong> ${record[feedConfig.mapping.area]}</p>
      <p><strong>Miete:</strong> ${record[feedConfig.mapping.rent]}</p>
      <p><strong>Räume:</strong> ${record[feedConfig.mapping.rooms]}</p>
      <p><strong>Beschreibung:</strong> ${record[feedConfig.mapping.notice]}</p>
      <image src="${imageUrl}" />
      `,
      image: { url: imageUrl },
    };

    return post;
  }
}
