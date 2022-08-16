import { namespace } from 'vuex-class';

export const SEARCH_STORE_NS = 'SEARCH';
export const searchStoreModule = namespace(SEARCH_STORE_NS);

export { default as SearchStoreModule } from './SearchStoreModule';
