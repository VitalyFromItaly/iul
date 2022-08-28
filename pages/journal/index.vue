<template>
  <journal />
</template>

<script lang='ts'>
import { Vue, Component } from 'nuxt-property-decorator';
import Journal from '~/business/journal/views/Journal.vue';

@Component({ components: { Journal } })
export default class JournalsPage extends Vue {
  async mounted(): Promise<void> {
    await this.$presenter.journalInstance.onMounted();
  }
}
</script>
