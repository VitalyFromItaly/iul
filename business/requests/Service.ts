import type { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IService, EUrls, TRequest, TQueryRequestPayload } from './Domain';
import { IBrowserStorage } from '~/core/cache/Domain';
import { EHttpCodes } from '~/@types/http';
import { context } from '~/core/context';

export default class Service implements IService {
  private readonly cache: IBrowserStorage;
  private readonly axios: NuxtAxiosInstance;
  constructor() {
    const { $cache, $axios } = context;
    this.cache = $cache;
    this.axios = $axios;
  }

  public async read(payload: TQueryRequestPayload): Promise<TRequest[]> {
    throw new Error('Method not implemented.');
  }

  public async readAll(): Promise<TRequest[]> {
    const { data, status } = await this.axios.get<{ queries: TRequest[] }>(EUrls.GET_QUERY_LIST);

    if (status !== EHttpCodes.SUCCESS) {
      return null;
    }
    return data.queries;
  }
}
