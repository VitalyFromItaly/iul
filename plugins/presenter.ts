
import { Context } from '@nuxt/types';
import BaseVuexStateHolder from '~/business/core/store/BaseVuexStateHolder';

import { IPresenter as ISearchPresenter, initSearchState } from '~/business/search/Domain';
import SearchPresenter from '~/business/search/Presenter';
import { SEARCH_STORE_NS } from '~/business/search/store/index';
export interface IPresenterPlugin {
  searchPresenter: ISearchPresenter;
}
// @ts-ignore;
const presenter: Plugin = (context: Context, inject: any) => {
  const { store } = context;

  let presenterSearch: ISearchPresenter;

  inject('presenter', {
    get searchPresenter(): ISearchPresenter {
      if (presenterSearch) {
        return presenterSearch;
      }

      const searchAdapter = new BaseVuexStateHolder(store, initSearchState(), SEARCH_STORE_NS);
      presenterSearch = new SearchPresenter(searchAdapter);
      return presenterSearch;
    }
  });
};

export default presenter;
