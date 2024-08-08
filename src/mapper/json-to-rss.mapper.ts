import { Injectable } from '@nestjs/common';
import { FeedConfig } from 'src/types/feed-config';
import { Feed, Item } from 'feed';
import { JSONPath } from 'jsonpath-plus';

@Injectable()
export class JsonToRssMapper {
  constructor() {}

  mapJsonToRss(
    jsonResults: Record<string, string>[],
    feedConfig: FeedConfig,
  ): Feed {
    const feed = new Feed({
      title: feedConfig.feedTitle,
      link: feedConfig.baseUri,
      id: feedConfig.name,
      copyright: '',
    });

    if (feedConfig.mappingOptions.filters.length > 0) {
      jsonResults = jsonResults.filter((record) => {
        for (const filter of feedConfig.mappingOptions.filters) {
          const field = this.jsonValue(filter.key, record);

          if (field === filter.valueToFilterOut) {
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

  mapPostsToItems(json: Record<string, string>, feedConfig: FeedConfig): Item {
    const imageUrl = this.getImageUrl(json, feedConfig);
    const link = this.getLink(json, feedConfig);
    const googleMaps = this.createMapsLink(json, feedConfig);
    const description = this.jsonValue(feedConfig.mapping.notice, json);

    const post: Item = {
      title: this.jsonValue(feedConfig.mapping.title, json),
      link,
      id: this.jsonValue(feedConfig.mapping.uid, json),
      description: Array.isArray(description)
        ? description.join('<br>')
        : description,
      date: new Date(),
      content: `
      <p><strong>Titel:</strong>  ${this.jsonValue(feedConfig.mapping.title, json)}</p>
      <p><strong>Bezirk:</strong> ${this.jsonValue(feedConfig.mapping.district, json)}</p>
      <p><strong>Fläche:</strong> ${this.jsonValue(feedConfig.mapping.area, json)}</p>
      <p><strong>Miete:</strong> ${this.jsonValue(feedConfig.mapping.rent, json)}</p>
      <p><strong>Räume:</strong> ${this.jsonValue(feedConfig.mapping.rooms, json)}</p>
      <p><strong>Beschreibung:</strong> ${this.jsonValue(feedConfig.mapping.notice, json)}</p>
      `,
      image: imageUrl ? { url: imageUrl } : undefined,
    };

    if (googleMaps) {
      post.content += googleMaps;
    }

    if (imageUrl) {
      post.content += `<image src="${imageUrl}" />`;
    }

    return post;
  }

  jsonValue = (
    path: string,
    json: null | boolean | number | string | object | any[],
  ): string => {
    const result = JSONPath({ path, json });

    if (
      Array.isArray(result) &&
      result.length === 0 &&
      typeof result !== 'string'
    ) {
      return ``;
    }

    return result.join(' ');
  };

  getImageUrl(
    json: Record<string, string>,
    feedConfig: FeedConfig,
  ): string | undefined {
    if (!feedConfig.mapping.imageUrl) return;

    const prefix = feedConfig.mappingOptions.imagePrefixFromJson
      ? this.jsonValue(feedConfig.mappingOptions.imagePrefix, json)
      : feedConfig.mappingOptions.imagePrefix;

    const url = this.jsonValue(feedConfig.mapping.imageUrl, json);

    const suffix = feedConfig.mappingOptions.imageSuffix;

    return prefix
      ? suffix
        ? `${prefix}${url}${suffix}`
        : `${prefix}${url}`
      : suffix
        ? `${url}${suffix}`
        : url;
  }

  getLink(
    json: Record<string, string>,
    feedConfig: FeedConfig,
  ): string | undefined {
    const prefix = feedConfig.mappingOptions.linkPrefixFromJson
      ? this.jsonValue(feedConfig.mappingOptions.linkPrefix, json)
      : feedConfig.mappingOptions.linkPrefix;

    const link =
      feedConfig.name === 'sul'
        ? // TODO handle this case more generically in the future
          this.jsonValue(feedConfig.mapping.url, json).replaceAll('/', '%2F')
        : this.jsonValue(feedConfig.mapping.url, json);

    let suffix = feedConfig.mappingOptions.linkSuffixFromJson
      ? this.jsonValue(feedConfig.mappingOptions.linkSuffix, json)
      : feedConfig.mappingOptions.linkSuffix;

    // TODO handle this case more generically in the future
    if (feedConfig.name === 'vonoviaBerlin' && suffix) {
      suffix = `-${suffix}`;
    }

    return prefix
      ? suffix
        ? `${prefix}${link}${suffix}`
        : `${prefix}${link}`
      : suffix
        ? `${link}${suffix}`
        : link;
  }

  createMapsLink(
    json: Record<string, string>,
    feedConfig: FeedConfig,
  ): string | undefined {
    if (!feedConfig.mapping.address) return;
    const path = feedConfig.mapping.address;
    const rawAddress = JSONPath({ path, json });
    const address = rawAddress
      .map((stringElement: string) => stringElement.trim())
      .join('+')
      .replace(/ /g, '+');

    return `<p><strong>Karte:</strong> <a href="https://www.google.com/maps/search/?api=1&query=${address}">Auf Google Maps ansehen.</a></p>`;
  }
}
