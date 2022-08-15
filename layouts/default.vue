<template>
  <main>
    <div class="">
      <layout-header />
      <layout-navigation />
      <div class="px-4">
        <nuxt />
      </div>
      <footer></footer>
    </div>

    <layout-global-loading />
  </main>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator';

import { EVuexNamespaces } from '~/@types/domain';
const coreStore = namespace(EVuexNamespaces.CORE);

@Component
export default class DefaultLayout extends Vue {
  @coreStore.Mutation setIsLoading: () => void;
  @coreStore.Mutation removeIsLoading: () => void;

  async mounted(): Promise<void> {
    if (this.$route.path === '/') {
      await this.$router.replace({ name: 'search' });
    }

    this.removeIsLoading();
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
