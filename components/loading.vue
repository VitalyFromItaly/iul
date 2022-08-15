<template>
  <b-overlay :show="true" no-wrap />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class Loading extends Vue {
  @Prop({ default: false }) isLoading: boolean;
}
</script>
