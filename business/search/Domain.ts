/* eslint-disable no-unused-vars */
import { TButtonVariant, TSelectOption } from '~/@types/component';
import { EHttpCodes } from '~/@types/http';
import { TFetchState } from '~/business/core/Domain';
import { IVuexObservable } from '~/business/core/store/Domain';

export enum EModal {
  NONE,
  QUERY_INFO
}

export enum EUrls {
  COUNTRIES_DICTIONARY = '/oksm_get_list',
  CHECK_QUERY = '/query_check_by_fields',
  QUERY_SUBMIT = '/query_submit',
  GET_QUERY_LIST = '/query_get_list'
}

export type TResponseQueryCheck = {
  res: number;
  q_id?: number;
  dstate?: string;
  err_txt?: string;
  q_state?: string | number;
  dcreated?: string;
  q_card_found?: number;
  q_site_found?: number;
};

export type TCountryOption = TSelectOption;

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

export type TModalHeader = { header: string };

export type TMethod = {
  type: 'presenter' | 'router';
  name: string;
  params?: any;
  presenterInstance?: string,
};

export type TModalButton = {
  variant: TButtonVariant;
  text: string;
  method: TMethod;
  isDisabled?: boolean;
};

export type TModalQueryData = TModalHeader & {
  data: TResponseQueryCheck;
  buttons: TModalButton[];
};

export type TModal = {
  data: TModalQueryData;
  shown: EModal
};

export type TState = TFetchState & {
  form: TFormData;
  countries: TCountryOption[];
  modal: TModal;
  lastQuery: TResponseQueryCheck;
};

export type TMountPayload = {
  documentId: number;
};

export type TSubmitQueryPayload = TSearchPayload;

export type TSubmitQueryResponse = {
  q_id: number;
  query?: TSubmitQueryPayload;
};

export interface IService {
  search(payload: TFormData): Promise<TResponseQueryCheck>;
  fetchCountryDictionary(): Promise<TCountryOption[]>;
  submitQuery(payload: TFormData): Promise<EHttpCodes>;
}

export interface IPresenter extends IVuexObservable<TState> {
  onMounted(): Promise<void>;
  onFormChanged(form: TFormData): void;
  onSearchSubmit(): Promise<void>;
  onResetForm(): void;
  // onOpenModal(modal: EModal): void;
  onCloseModal():void;
  onSubmitQuery(): Promise<void>;
}

export const initSearchState = (): TState => ({
  isLoading: true,
  isError: false,
  form: {} as TFormData,
  countries: [],
  modal: {
    data: null,
    shown: EModal.NONE
  },
  lastQuery: null
});
