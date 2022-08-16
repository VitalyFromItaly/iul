<template>
  <div>
    <b-overlay :show="state.isLoading">
      <search-form />
    </b-overlay>
    <modal v-if="state.modalShown === EModal.FOUND_QUERY" />
    <!-- <loading v-if="state.isLoading" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import type { TState, IPresenter, TFormData } from '../Domain';
import { EModal } from '../Domain';
import { searchStoreModule } from '../store';
import SearchForm from './Form.vue';

@Component({ components: { SearchForm } })
export default class Search extends Vue {
  @searchStoreModule.State('internalState') state: TState;
  EModal = EModal;
  private presenter: IPresenter;

  form = {} as TFormData;

  @Watch('form', { deep: true })
  onFormChanged(form: TFormData): void {
    this.presenter.onFormChanged(form);
  }

  public async mounted(): Promise<void> {
    this.presenter = this.$presenter.searchPresenter;

    await this.presenter.onMounted();
  }
}
</script>
