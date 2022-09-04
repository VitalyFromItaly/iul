/* eslint-disable no-unused-vars */
import { TFetchState } from '~/business/core/Domain';
import { IVuexObservable } from '~/business/core/store/Domain';

export enum EUrls {
  USER = 'user',
  LOGOUT = 'user/logout'
}

export type TUserInfo = {
  dn?: string;
  groups: string[];
  id: string;
  name: string;
};

export type TState = TFetchState & {
  user: TUserInfo;
  authType: string;
};

export type TUserInfoRaw = {
  auth: string;
  user: {
    DN?: string;
    Groups: string[];
    Id: string;
    Name: string;
  }
};

export type TUser = {
  user: TUserInfo;
  authType: string;
};

export interface IService {
  read(): Promise<TUser>;
  logout(): Promise<void>;
}

export interface IPresenter extends IVuexObservable<TState> {
  onLoad(): Promise<void>;
  onLogout(): Promise<void>;
}

export const initUserState = (): TState => ({
  isLoading: true,
  isError: false,
  authType: '',
  user: null
});
