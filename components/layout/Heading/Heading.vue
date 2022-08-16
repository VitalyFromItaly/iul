<template>
  <h3 class="text-center text-2xl font-bold mt-1">{{ heading }}</h3>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator';
import { EVuexNamespaces, EPageNames } from '~/@types/domain';
const coreStore = namespace(EVuexNamespaces.CORE);

@Component
export default class GlobalLoading extends Vue {
  @coreStore.State currentPageName: string;

  private get heading(): string {
    return EPageNames[this.currentPageName];
  }
}
</script>
