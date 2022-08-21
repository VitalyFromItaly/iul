import { namespace } from 'vuex-class';

export const REQUESTS_STORE_NS = 'Requests';
export const requestsStoreModule = namespace(REQUESTS_STORE_NS);

export { default as RequestsStoreModule } from './RequestsStoreModule';
