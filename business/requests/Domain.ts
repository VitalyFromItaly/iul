/* eslint-disable no-unused-vars */
import { TFetchState } from '~/business/core/Domain';
import { IVuexObservable } from '~/business/core/store/Domain';
import { EQueryResultState } from '~/@types/domain';

export enum EUrls {
  GET_QUERY_LIST = 'query_get_list'
}

export type TText = {
  oksm_id: string;
  iul_name: string;
  [x: string]: string;
};

export type TQueryRequestPayload = {
  q_id: number,
  dcreated_from?: string;
  dcreated_to?: string;
  dstate_from?: string;
  q_state?: EQueryResultState[];
};

export type TRequest = {
  q_id: number;
  dstate: string;
  q_text: TText;
  err_txt: string;
  q_state: EQueryResultState;
  user_id: number;
  q_text_show: string;
  dcreated: string;
  user_name: string;
  q_state_text_show: string;
  q_card_found: number;
  q_site_found: number;
  user_fullname: string;
  q_card_filtered: number;
  q_site_filtered: number;
};

export type TState = TFetchState & {
  id: number;
  requests: TRequest[];
};

export type TMountPayload = {
  id: number;
};

export interface IService {
  readAll(): Promise<TRequest[]>;
  readOne(payload: TQueryRequestPayload): Promise<TRequest[]>;
}

export interface IPresenter extends IVuexObservable<TState> {
  onMounted(payload?: TMountPayload): Promise<void>;
}

export const initRequestsState = (): TState => ({
  isLoading: true,
  isError: false,
  requests: null,
  id: null
});
