---
to: business/<%= section %>/<%= name %>/views/<%= h.changeCase.upperCaseFirst(name) %>.vue
---
<template>
  <cds-container label="<%= h.changeCase.upperCaseFirst(name) %>">
    <div v-if="!state.isLoading">
      {{ state.text }}
    </div>
  </cds-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import type { TState, IPresenter, TMountPayload } from '../Domain';
import { <%= name %>StoreModule } from '../store';

@Component
export default class <%= h.changeCase.upperCaseFirst(name) %> extends Vue {
  @<%= name %>StoreModule.State('internalState') state: TState;

  private presenter: IPresenter;

  get documentId(): number {
    return +this.$route.params.id;
  }

  public async mounted(): Promise<void> {
    this.presenter = this.$presenter.<%= name %>Instance;
    const payload: TMountPayload = {
      documentId: this.documentId
    };

    await this.presenter.onMounted(payload);
  }
}
</script>

<style lang="scss" module>
@import '~@central-design-system/components/dist/mixins/scss/layout/spacing';
@import '~@central-design-system/components/dist/mixins/scss/layout/breakpoint';

h1 {
   color: red;
}
</style>
