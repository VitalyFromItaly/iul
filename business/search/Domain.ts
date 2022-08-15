/* eslint-disable no-unused-vars */
import { TFetchState } from '~/business/core/Domain';
import { IVuexObservable } from '~/business/core/store/Domain';

export enum EModal {
  NONE,
  SUCCESS_SEARCH
}

export enum EQueryResult {
  NEVER,
  PENDING,
  EXIST
}

export enum EUrls {
  COUNTRIES_DICTIONARY = '/oksm_get_list',
  CHECK_QUERY = '/query_check_by_fields',
  QUERY_SUBMIT = '/query_submit',
  GET_QUERY_LIST = '/query_get_list'
}

export type TCountryOption = {
  name: string;
  fullName: string;
  id: number;
};

export type TInternalCountriesDictionary = {
  code: string;
  code2: string;
  code3: string;
  fullname: string;
  name: string;
  id: number;
};

export type TCountriesDictionary = {
  OKSM: TInternalCountriesDictionary[];
};

export type TFormData = {
  name: string;
  country?: string;
  id?: string;
  address?: string;
  boss?: string;
};

export type TSearchPayload = {
  iul_name: string;
  oksm_id?: string;
  iul_id?: string;
  iul_address?: string;
  iul_employee?: string;
};

export type TState = TFetchState & {
  form: TFormData;
  countries: TCountryOption[];
  modalShown: EModal;
};

export type TMountPayload = {
  documentId: number;
};

export interface IService {
  search(payload: TFormData): Promise<any>;
  fetchCountryDictionary(): Promise<TCountryOption[]>;
}

export interface IPresenter extends IVuexObservable<TState> {
  onMounted(): Promise<void>;
  onFormChanged(form: TFormData): void;
  onSearchSubmit(): Promise<void>;
  onResetForm(): void;
  onOpenSidebar(sidebarName: EModal): void;
}

export const initSearchState = (): TState => ({
  isLoading: true,
  isError: false,
  form: {} as TFormData,
  countries: [],
  modalShown: EModal.NONE
});
