<template>
  <div>
    <b-overlay :show="state.isLoading">
      <search-form />
    </b-overlay>
    <!-- <loading v-if="state.isLoading" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import type { TState, IPresenter, TFormData } from '../Domain';
import { searchStoreModule } from '../store';
import SearchForm from './Form.vue';

@Component({ components: { SearchForm } })
export default class Search extends Vue {
  @searchStoreModule.State('internalState') state: TState;

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
