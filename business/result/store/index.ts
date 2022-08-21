import { namespace } from 'vuex-class';

export const RESULT_STORE_NS = 'Result';
export const resultStoreModule = namespace(RESULT_STORE_NS);

export { default as ResultStoreModule } from './ResultStoreModule';
