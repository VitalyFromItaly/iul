import type { NuxtAxiosInstance } from '@nuxtjs/axios';
import type { IService, TResult } from './Domain';
import { EUrls } from './Domain';
import { IBrowserStorage } from '~/core/cache/Domain';
import { context } from '~/core/context';
import { EHttpCodes } from '~/@types/http';

export default class Service implements IService {
  private readonly cache: IBrowserStorage;
  private readonly axios: NuxtAxiosInstance;
  constructor() {
    const { $cache, $axios } = context;
    this.cache = $cache;
    this.axios = $axios;
  }

  async readOne(id: number): Promise<TResult[]> {
    const { data, status } = await this.axios.post<{ results: TResult[] }>(EUrls.GET_RESULT_BY_ID, { q_id: id });
    if (status !== EHttpCodes.SUCCESS) {
      return null;
    }

    return data.results;
  }
}
