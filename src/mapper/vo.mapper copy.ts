// import { Injectable } from '@nestjs/common';
// import { FeedConfig } from 'src/types/feed-config';
// import { Feed, Item } from 'feed';
// import { JSONPath } from 'jsonpath-plus';

// @Injectable()
// export class VoToRssMapper {
//   constructor() {}

//   mapJsonToRss(
//     jsonResults: Record<string, string>[],
//     feedConfig: FeedConfig,
//   ): Feed {
//     const feed = new Feed({
//       title: feedConfig.mapping.feedTitle,
//       link: feedConfig.mapping.baseUri,
//       id: feedConfig.name,
//       copyright: '',
//     });

//     if (feedConfig.mapping.filters.length > 0) {
//       jsonResults = jsonResults.filter((record) => {
//         for (const filter of feedConfig.mapping.filters) {
//           if (record[filter.key] === filter.valueToFilterOut) {
//             return false;
//           }
//         }
//         return true;
//       });
//     }
//     jsonResults.forEach((record) => {
//       const item = this.mapPostsToItems(record, feedConfig);
//       feed.addItem(item);
//     });

//     feed.addCategory('Wohnungen');
//     feed.addCategory('Mietangebote');

//     return feed;
//   }

//   mapPostsToItems(json: Record<string, string>, feedConfig: FeedConfig): Item {
//     console.log('JsonPath \n', JSONPath({ path: '$.titel', json }));
//     const imageUrl = feedConfig.mapping.imageHasFullUrl
//       ? `${json[feedConfig.mapping.imageUrl]}`
//       : `${feedConfig.mapping.baseUri}${json[feedConfig.mapping.imageUrl]}`;

//     const post: Item = {
//       title: json[feedConfig.mapping.title],
//       link: `${feedConfig.mapping.baseUri}${json[feedConfig.mapping.url]}-${json['wrk_id']}`,
//       id: json[feedConfig.mapping.uid],
//       description: json[feedConfig.mapping.notice] ?? '',
//       date: new Date(),
//       content: `
//       <p><strong>Titel:</strong>  ${JSONPath({ path: feedConfig.mapping.title, json })}</p>
//       <p><strong>Bezirk:</strong> ${json[feedConfig.mapping.district]}</p>
//       <p><strong>Fläche:</strong> ${json[feedConfig.mapping.area]}</p>
//       <p><strong>Miete:</strong> ${json[feedConfig.mapping.rent]}</p>
//       <p><strong>Räume:</strong> ${json[feedConfig.mapping.rooms]}</p>
//       <p><strong>Beschreibung:</strong> ${json[feedConfig.mapping.notice]}</p>
//       <image src="${imageUrl}" />
//       `,
//       image: { url: imageUrl },
//     };

//     return post;
//   }
// }
