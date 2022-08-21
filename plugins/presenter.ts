
import { Context } from '@nuxt/types';
import BaseVuexStateHolder from '~/business/core/store/BaseVuexStateHolder';

import { IPresenter as ISearchInstance, initSearchState } from '~/business/search/Domain';
import SearchInstance from '~/business/search/Presenter';
import { SEARCH_STORE_NS } from '~/business/search/store/index';

import { IPresenter as IJournalPresenter, initJournalState } from '~/business/journal/Domain';
import JournalPresenter from '~/business/journal/Presenter';
import { JOURNAL_STORE_NS } from '~/business/journal/store/index';

import { IPresenter as IResultPresenter, initResultState } from '~/business/result/Domain';
import ResultPresenter from '~/business/result/Presenter';
import { RESULT_STORE_NS } from '~/business/result/store/index';

export interface IPresenterPlugin {
  searchInstance: ISearchInstance;
  journalInstance: IJournalPresenter;
  resultInstance: IResultPresenter;
}
// @ts-ignore;
const presenter: Plugin = (context: Context, inject: any) => {
  const { store } = context;

  let presenterSearch: ISearchInstance;
  let presenterJournal: IJournalPresenter;
  let presenterResult: IResultPresenter;

  inject('presenter', {
    get resultInstance(): IResultPresenter {
      if (presenterResult) {
        return presenterResult;
      }

      const resultAdapter = new BaseVuexStateHolder(store, initResultState(), RESULT_STORE_NS);
      presenterResult = new ResultPresenter(resultAdapter);
      return presenterResult;
    },

    get searchInstance(): ISearchInstance {
      if (presenterSearch) {
        return presenterSearch;
      }

      const searchAdapter = new BaseVuexStateHolder(store, initSearchState(), SEARCH_STORE_NS);
      presenterSearch = new SearchInstance(searchAdapter);
      return presenterSearch;
    },

    get journalInstance(): IJournalPresenter {
      if (presenterJournal) {
        return presenterJournal;
      }

      const journalAdapter = new BaseVuexStateHolder(store, initJournalState(), JOURNAL_STORE_NS);
      presenterJournal = new JournalPresenter(journalAdapter);
      return presenterJournal;
    }
  });
};

export default presenter;
