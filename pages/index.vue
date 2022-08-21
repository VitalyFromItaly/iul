<template>
  <div></div>
</template>
<script lang='ts'>
import { Vue, Component } from 'nuxt-property-decorator';
@Component
export default class Index extends Vue {
  mounted(): void {
    this.$router.replace({ name: 'search' });
  }
}
</script>
