<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import type { TState, IPresenter, TMountPayload } from '../Domain';
import { requestsStoreModule } from '../store';

@Component
export default class Requests extends Vue {
  @requestsStoreModule.State('internalState') state: TState;

  private presenter: IPresenter;

  get documentId(): number {
    return +this.$route.params.id;
  }

  public async mounted(): Promise<void> {
    this.presenter = this.$presenter.requestsInstance;
    const payload: TMountPayload = {
      documentId: this.documentId
    };

    await this.presenter.onMounted(payload);
  }
}
</script>