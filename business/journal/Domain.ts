/* eslint-disable no-unused-vars */
import { TFetchState } from '~/business/core/Domain';
import { IVuexObservable } from '~/business/core/store/Domain';
import { EQueryResultState, EQueryStatus } from '~/@types/domain';

export enum EUrls {
  GET_LOG = '/log_get'
}

export type TInfoType = 'INFO';

export type TGetLogPayload = {
  q_id: number;
  user_id?: number;
  dcreated_from?: string;
  dcreated_to?: string;
  q_state?: EQueryResultState[];
};

export type TLogResponse = {
  h_id: number;
  q_id: number,
  dstate: string,
  q_text: {
    oksm_id?: string;
    iul_name?: string;
  },
  q_status: EQueryStatus;
  q_status_name: string;
  info_msg: string;
  info_type: TInfoType;
  err_txt: string;
  q_state: EQueryResultState,
  user_id: number,
  dcreated: string;
  user_name: string;
  user_fullname: string;
};

export type TState = TFetchState & {
  id: number;
  logs: TLogResponse[];
};

export type TMountPayload = {
  id: number;
};

export interface IService {
  readAll(): Promise<TLogResponse[]>;
  readOne(payload: TGetLogPayload): Promise<TLogResponse[]>;
}

export interface IPresenter extends IVuexObservable<TState> {
  onMounted(payload?: TMountPayload): Promise<void>;
}

export const initJournalState = (): TState => ({
  isLoading: true,
  isError: false,
  logs: null,
  id: null
});
