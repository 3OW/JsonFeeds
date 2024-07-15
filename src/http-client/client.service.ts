import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpClientService {
  constructor() {}

  async getJson(
    url: string,
    requestType: 'GET',
    payload?: object,
    headers?: Record<string, string>,
  ): Promise<string | undefined> {
    const got = (await import('got')).default;
    const response = await got(url, {
      method: requestType,
      timeout: { request: 10000 },
      retry: {
        errorCodes: ['ETIMEDOUT', 'ECONNRESET'],
        statusCodes: [408, 429, 500, 502, 503, 504],
        limit: 3,
        backoffLimit: 2,
        noise: 0.1,
      },
      json: payload,
      headers: headers ?? {},
    }).catch((error) => {
      console.error(`getJson(): Error fetching JSON response: ${error}`);
      return undefined;
    });

    return response?.body ? response.body : undefined;
  }

  async postJson(
    url: string,
    requestType: 'POST',
    payload?: object,
    headers?: Record<string, string>,
  ): Promise<string | undefined> {
    const got = (await import('got')).default;
    const response = await got(url, {
      method: requestType,
      timeout: { request: 10000 },
      retry: {
        errorCodes: ['ETIMEDOUT', 'ECONNRESET'],
        statusCodes: [408, 429, 500, 502, 503, 504],
        limit: 3,
        backoffLimit: 2,
        noise: 0.1,
      },
      json: payload,
      headers: headers ?? {},
    }).catch((error) => {
      console.error(`postJson(): Error fetching JSON response: ${error}`);
      return undefined;
    });

    return response?.body ? response.body : undefined;
  }
}
