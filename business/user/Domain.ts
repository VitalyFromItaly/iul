/* eslint-disable no-unused-vars */
import { TFetchState } from '~/business/core/Domain';
import { IVuexObservable } from '~/business/core/store/Domain';

export enum EUrls {
  USER = 'user'
}

export type TState = TFetchState & {
  id: number;
  groups: string[];
  name: string;
  dn?: string;
};

export type TUserInfo = {
  dn?: string;
  groups: string[];
  id: string;
  name: string;
};

export type TUserInfoRaw = {
  DN?: string;
  Groups: string[];
  Id: string;
  Name: string;
};

export interface IService {
  read(): Promise<TUserInfo>;
}

export interface IPresenter extends IVuexObservable<TState> {
  onLoad(): Promise<void>;
}

export const initUserState = (): TState => ({
  isLoading: true,
  isError: false,
  name: '',
  groups: [],
  id: null,
  dn: null
});
