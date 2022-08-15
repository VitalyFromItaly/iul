import type { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IService, TCountriesDictionary, TCountryOption, TFormData, TInternalCountriesDictionary, TSearchPayload, EUrls } from './Domain';
import { context } from '~/core/context';
import { IBrowserStorage } from '~/core/cache/Domain';
import { ONE_DAY } from '~/constants/time';
import { EHttpCodes } from '~/@types/http';
import { ETags, EKeys } from '~/@types/cache';

export default class Service implements IService {
  private readonly cache: IBrowserStorage;
  private readonly axios: NuxtAxiosInstance;
  // private readonly PORT = 8005;
  constructor() {
    const { $cache, $axios } = context;
    this.cache = $cache;
    this.axios = $axios;
  }

  public async search(rawPayload: TFormData): Promise<any> {
    const { boss, address, name, id, country } = rawPayload;

    const payload: TSearchPayload = { iul_name: name };

    if (address) { payload.iul_address = address; }
    if (id) { payload.iul_id = id; }
    if (boss) { payload.iul_employee = boss; }
    if (country) { payload.oksm_id = country; }

    // let response;
    // let response = await this.axios.$post('/query_check_by_fields', payload);
    // if (response) { return response; }

    const res = new Promise(resolve => setTimeout(() => {
      resolve({ message: 'api is coming', body: payload });
    }, 2000));
    return await res;
  }

  public async fetchCountryDictionary(): Promise<TCountryOption[]> {
    const cachedCountries = this.cache.get<TCountryOption[]>(EKeys.COUNTRIES, ETags.SEARCH);
    if (cachedCountries) { return cachedCountries; }

    const { data, status } = await this.axios.get<TCountriesDictionary>(EUrls.COUNTRIES_DICTIONARY);

    if (status !== EHttpCodes.SUCCESS) {
      return;
    }

    const { OKSM: rawCountries } = data;
    const countries: TCountryOption[] = rawCountries.map((country: TInternalCountriesDictionary) => {
      const { name, fullname: fullName, id } = country;
      return { name, fullName, id };
    });

    this.cache.set(EKeys.COUNTRIES, ETags.SEARCH, countries, ONE_DAY);
    return countries;
  }
}
