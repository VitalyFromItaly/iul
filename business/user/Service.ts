import type { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IService, EUrls, TUserInfo, TUserInfoRaw } from './Domain';
import { userMapper } from './mappers/userMapper';
import { IBrowserStorage } from '~/core/cache/Domain';
import { EHttpCodes } from '~/@types/http';
import { context } from '~/core/context';
import { EKeys, ETags } from '~/@types/cache';
import { ONE_DAY } from '~/constants/time';

export default class Service implements IService {
  private readonly cache: IBrowserStorage;
  private readonly axios: NuxtAxiosInstance;
  constructor() {
    const { $cache, $axios } = context;
    this.cache = $cache;
    this.axios = $axios;
  }

  async read(): Promise<TUserInfo> {
    const cacheUser = this.cache.get<TUserInfo>(EKeys.USER, ETags.USER);
    if (cacheUser) { return cacheUser; }

    const { data: rawUser, status } = await this.axios.get<TUserInfoRaw>(EUrls.USER);

    if (status !== EHttpCodes.SUCCESS) {
      return null;
    }

    const user = userMapper(rawUser);
    this.cache.set<TUserInfo>(EKeys.USER, ETags.USER, user, ONE_DAY);

    return user;
  }
}
