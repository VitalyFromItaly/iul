/* eslint-disable no-unused-vars */
import { TFetchState } from '~/business/core/Domain';
import { IVuexObservable } from '~/business/core/store/Domain';

export enum EUrls {
  GET_RESULT_BY_ID = '/query_get_results'
}

export enum ECheckState {
  NO,
  Yes
}

export enum EWebPageType {
  SITE = 1,
  IMAGE
}

export type TAttribute = {
  attr_value: string;
  attr_type_id: number; // -1 показать картинку
  attr_type_name: string;
  png?: number;
  res_id?: number;
};

export type TCard = {
  res_id: number;
  attributes: TAttribute[];
  check_state: ECheckState;
  business_register_id: number;
  business_register_name: string;
};

export type TSite = {
  png: number;
  url: string;
  domain: string;
  res_id: number;
  attributes: TAttribute[] | null;
  check_state: ECheckState;
  res_card_id: any;
  webpage_type_id: EWebPageType;
};

export type TResult = {
  dcreated: string;
  png: number;
  url: string;
  name_in_registry: string;
  oksm_code: number | string | null;
  res_type_name: string;
  source: string;
  title: string;
  domain: string;
  attributes: TAttribute[] | null;
  check_state: ECheckState;
  res_card_id: any;
  webpage_type_id: EWebPageType;
  res_id: number;
  business_register_id: number;
  business_register_name: string;
};

export type TState = TFetchState & {
  id: number;
  results: TResult[];
};

export type TMountPayload = {
  id: number;
};

export interface IService {
  readOne(id: number): Promise<TResult[]>;
}

export interface IPresenter extends IVuexObservable<TState> {
  onMounted(payload: TMountPayload): Promise<void>;
}

export const initResultState = (): TState => ({
  isLoading: true,
  isError: false,
  id: null,
  results: []
});

export const webpageSiteDictionary = {
  [EWebPageType.SITE]: 'Сайт',
  [EWebPageType.IMAGE]: 'Картинка'
};

export const checkStateDictionary = {
  [ECheckState.NO]: 'нет',
  [ECheckState.Yes]: 'да'
};
