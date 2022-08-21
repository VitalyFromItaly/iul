import { Module } from 'vuex-module-decorators';
import { initRequestsState, TState } from '../Domain';
import { BaseVuexModule } from '~/business/core/store/BaseVuexModule';

@Module({
  namespaced: true,
  stateFactory: true
})
export default class RequestsStoreModule extends BaseVuexModule<TState> {
  internalState: TState = initRequestsState();
}
