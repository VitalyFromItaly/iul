import type { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IService, TCountriesDictionary, TCountryOption, TFormData, TInternalCountriesDictionary, EUrls, TSubmitQueryResponse, TResponseQueryCheck } from './Domain';
import { prepareFormData } from './helpers/prepareFormData';
import { context } from '~/core/context';
import { IBrowserStorage } from '~/core/cache/Domain';
import { ONE_DAY, ONE_MONTH } from '~/constants/time';
import { EHttpCodes } from '~/@types/http';
import { ETags, EKeys } from '~/@types/cache';

export default class Service implements IService {
  private readonly cache: IBrowserStorage;
  private readonly axios: NuxtAxiosInstance;
  constructor() {
    const { $cache, $axios } = context;
    this.cache = $cache;
    this.axios = $axios;
  }

  public async search(rawPayload: TFormData): Promise<TResponseQueryCheck> {
    const payload = prepareFormData(rawPayload);

    const { status, data } = await this.axios.post<TResponseQueryCheck>(EUrls.CHECK_QUERY, payload);
    if (status !== EHttpCodes.SUCCESS) {
      return null;
    }

    return data;
  }

  public async fetchCountryDictionary(): Promise<TCountryOption[]> {
    const cachedCountries = this.cache.get<TCountryOption[]>(EKeys.COUNTRIES, ETags.SEARCH);
    if (cachedCountries) { return cachedCountries; }

    const { data, status } = await this.axios.get<TCountriesDictionary>(EUrls.COUNTRIES_DICTIONARY);

    if (status !== EHttpCodes.SUCCESS) {
      return null;
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

  public async submitQuery(rawPayload: TFormData): Promise<EHttpCodes> {
    const payload = prepareFormData(rawPayload);

    const { status } = await this.axios.post<TSubmitQueryResponse>(EUrls.QUERY_SUBMIT, payload);
    return status;
  }

  public saveFormInCache(form: TFormData): void {
    this.cache.set<TFormData>('lastFormData', 'search', form, ONE_MONTH);
  }

  public getFormFromCache(): TFormData | null {
    const lastForm = this.cache.get<TFormData>('lastFormData', 'search');
    if (lastForm) {
      return lastForm;
    }

    return null;
  }
}
