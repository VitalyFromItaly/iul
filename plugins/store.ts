import { Context } from '@nuxt/types';

import { SEARCH_STORE_NS, SearchStoreModule } from '~/business/search/store/index';

export default ({ store }: Context) => {
  // @ts-ignore
  store.registerModule(SEARCH_STORE_NS, SearchStoreModule);
};
