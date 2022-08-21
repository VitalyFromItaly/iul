import type { NuxtAxiosInstance } from '@nuxtjs/axios';
import type { IService, TGetLogPayload, TLogResponse } from './Domain';
import { EUrls } from './Domain';
import { IBrowserStorage } from '~/core/cache/Domain';
import { context } from '~/core/context';
import { EHttpCodes } from '~/@types/http';

export default class Service implements IService {
  private readonly cache: IBrowserStorage;
  private readonly axios: NuxtAxiosInstance;
  // private readonly PORT = 8005;
  constructor() {
    const { $cache, $axios } = context;
    this.cache = $cache;
    this.axios = $axios;
  }

  public async readAll(): Promise<TLogResponse[]> {
    const { data, status } = await this.axios.get<{ log: TLogResponse[]}>(EUrls.GET_LOG);
    if (status !== EHttpCodes.SUCCESS) {
      return null;
    }
    return data.log;
  }

  public async readOne(payload: TGetLogPayload): Promise<TLogResponse[]> {
    const { data, status } = await this.axios.post<{ log: TLogResponse[]}>(EUrls.GET_LOG, payload);
    if (status !== EHttpCodes.SUCCESS) {
      return null;
    }
    return data.log;
  }
}
