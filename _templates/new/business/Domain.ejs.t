---
to: business/<%= section %>/<%= name %>/Domain.ts
---
import { TFetchState } from '~/business/core/Domain';
import { IVuexObservable } from '~/business/core/store/Domain';

export type TState = TFetchState & {
  documentId: number;
  data: any;
};

export type TMountPayload = {
  documentId: number;
};

export interface IService {
  read(documentId: number): Promise<any>;
}

export interface IPresenter extends IVuexObservable<TState> {
  onMounted(payload: TMountPayload): Promise<void>;
}

export const init<%= h.changeCase.upperCaseFirst(name) %>State = (): TState => ({
  isLoading: true,
  isError: false,
  data: null,
  documentId: null
});
