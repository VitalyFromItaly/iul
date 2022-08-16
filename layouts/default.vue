<template>
  <main>
    <div class="">
      <layout-header />
      <layout-navigation />
      <layout-heading />
      <div class="px-4">
        <nuxt />
      </div>
      <footer></footer>
    </div>

    <layout-global-loading />
    <notifications position="top center" class="mt-2" />
  </main>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';

import { EVuexNamespaces, TNotificationPayload } from '~/@types/domain';
import { EEventBusName } from '~/core/bus/Domain';
const coreStore = namespace(EVuexNamespaces.CORE);

@Component
export default class DefaultLayout extends Vue {
  @coreStore.Mutation setIsLoading: () => void;
  @coreStore.Mutation removeIsLoading: () => void;

  async mounted(): Promise<void> {
    this.onNotificationEvent();

    if (this.$route.path === '/') {
      await this.$router.replace({ name: 'search' });
    }

    this.removeIsLoading();
  }

  private onNotificationEvent(): void {
    this.$bus.on(EEventBusName.NOTIFICATION, (payload: TNotificationPayload) => {
      console.log({ payload });
      const { type, title, text } = payload;
      this.$notification({ title: title || '', text, type });
    });
    console.log(this.$bus);
  }
}
</script>
<style scoped>
.page {
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr 1rem auto;
  grid-template-columns: min-content auto;
  grid-template-areas:
    'pagenav header'
    'pagenav content'
    'pagenav footer'
    'pagenav environment';
}

.content {
  grid-area: content;
  overflow-y: auto;
}
</style>
