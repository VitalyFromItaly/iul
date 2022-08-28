<template>
  <div>
    <b-overlay :show="state.isLoading">
      <search-form class="lg:px-48" />
    </b-overlay>
    <modal v-if="state.modal.shown === EModal.QUERY_INFO" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import type { TState, IPresenter } from '../Domain';
import { EModal } from '../Domain';
import { searchStoreModule } from '../store';
import SearchForm from './Form.vue';
import Modal from './Modal.vue';

@Component({ components: { SearchForm, Modal } })
export default class Search extends Vue {
  @searchStoreModule.State('internalState') state: TState;
  EModal = EModal;
  private presenter: IPresenter;

  public async mounted(): Promise<void> {
    this.presenter = this.$presenter.searchInstance;
    await this.presenter.onMounted();
  }
}
</script>
