import { Module } from 'vuex-module-decorators';
import type { TCountryOption, TState } from '../Domain';
import { initSearchState } from '../Domain';
import { BaseVuexModule } from '~/business/core/store/BaseVuexModule';

@Module({
  namespaced: true,
  stateFactory: true
})
export default class SearchStoreModule extends BaseVuexModule<TState> {
  internalState: TState = initSearchState();

  public get countries(): TCountryOption[] {
    return this.internalState.countries;
  }
}
