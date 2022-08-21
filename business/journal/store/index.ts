import { namespace } from 'vuex-class';

export const JOURNAL_STORE_NS = 'Journal';
export const journalStoreModule = namespace(JOURNAL_STORE_NS);

export { default as JournalStoreModule } from './JournalStoreModule';
