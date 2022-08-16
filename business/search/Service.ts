import type { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IService, TCountriesDictionary, TCountryOption, TFormData, TInternalCountriesDictionary, TSearchPayload, EUrls, TSubmitQueryPayload, TSubmitQueryResponse, TResponseQueryCheck } from './Domain';
import { context } from '~/core/context';
import { IBrowserStorage } from '~/core/cache/Domain';
import { ONE_DAY } from '~/constants/time';
import { EHttpCodes } from '~/@types/http';
import { ETags, EKeys } from '~/@types/cache';
import { prepareFormData } from './helpers/prepareFormData';

export default class Service implements IService {
  private readonly cache: IBrowserStorage;
  private readonly axios: NuxtAxiosInstance;
  // private readonly PORT = 8005;
  constructor() {
    const { $cache, $axios } = context;
    this.cache = $cache;
    this.axios = $axios;
  }

  public async search(rawPayload: TFormData): Promise<TResponseQueryCheck> {
    const payload = prepareFormData(rawPayload);

    const { status, data } = await this.axios.post<TResponseQueryCheck>(EUrls.CHECK_QUERY, payload);
    if (status !== EHttpCodes.SUCCESS) {
      return;
    }

    return data;
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
      const { name: text, code2: value } = country;
      return { text, value };
    });
    countries.unshift({ text: 'Выберете страну', value: null });
    this.cache.set(EKeys.COUNTRIES, ETags.SEARCH, countries, ONE_DAY);
    return countries;
  }

  public async submitQuery(rawPayload: TFormData): Promise<TSubmitQueryResponse> {
    const payload = prepareFormData(rawPayload);

    const { status, data } = await this.axios.post<TSubmitQueryResponse>(EUrls.QUERY_SUBMIT, payload);
    if (status !== EHttpCodes.SUCCESS) {
      return;
    }

    return data;
  }
}
