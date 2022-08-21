import { Module } from 'vuex-module-decorators';
import { initResultState, TState } from '../Domain';
import { BaseVuexModule } from '~/business/core/store/BaseVuexModule';

@Module({
  namespaced: true,
  stateFactory: true
})
export default class ResultStoreModule extends BaseVuexModule<TState> {
  internalState: TState = initResultState();
}
