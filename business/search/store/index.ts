import { namespace } from 'vuex-class';

export const SEARCH_STORE_NS = 'Search';
export const searchStoreModule = namespace(SEARCH_STORE_NS);

export { default as SearchStoreModule } from './SearchStoreModule';
