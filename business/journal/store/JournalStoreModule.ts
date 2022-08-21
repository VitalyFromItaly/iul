import { Module } from 'vuex-module-decorators';
import { initJournalState, TState } from '../Domain';
import { BaseVuexModule } from '~/business/core/store/BaseVuexModule';

@Module({
  namespaced: true,
  stateFactory: true
})
export default class JournalStoreModule extends BaseVuexModule<TState> {
  internalState: TState = initJournalState();
}
