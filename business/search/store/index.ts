import { namespace } from 'vuex-class';

export const SEARCH_STORE_NS = 'search-form';
export const searchStoreModule = namespace(SEARCH_STORE_NS);

export { default as SearchStoreModule } from './SearchStoreModule';
