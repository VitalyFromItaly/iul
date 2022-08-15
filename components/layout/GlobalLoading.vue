<template>
  <b-overlay :show="isLoading" no-wrap size="xl" opacity="0.6" />
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator';
import { EVuexNamespaces } from '~/@types/domain';
const coreStore = namespace(EVuexNamespaces.CORE);

@Component
export default class GlobalLoading extends Vue {
  @coreStore.State isLoading: boolean;
}
</script>
