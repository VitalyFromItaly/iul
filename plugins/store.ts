import { Context } from '@nuxt/types';

import { SEARCH_STORE_NS, SearchStoreModule } from '~/business/search/store/index';
import { JOURNAL_STORE_NS, JournalStoreModule } from '~/business/journal/store/index';
import { RESULT_STORE_NS, ResultStoreModule } from '~/business/result/store/index';
import { REQUESTS_STORE_NS, RequestsStoreModule } from '~/business/requests/store/index';
import { USER_STORE_NS, UserStoreModule } from '~/business/user/store/index';

export default ({ store }: Context) => {
  // @ts-ignore
  store.registerModule(USER_STORE_NS, UserStoreModule);
  // @ts-ignore
  store.registerModule(REQUESTS_STORE_NS, RequestsStoreModule);
  // @ts-ignore
  store.registerModule(RESULT_STORE_NS, ResultStoreModule);
  // @ts-ignore
  store.registerModule(JOURNAL_STORE_NS, JournalStoreModule);
  // @ts-ignore
  store.registerModule(SEARCH_STORE_NS, SearchStoreModule);
};
