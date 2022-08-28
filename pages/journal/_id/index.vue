<template>
  <div>
    <div class="text-center my-2 font-bold">Журнал запроса {{ $route.params.id }}</div>
    <journal />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import Journal from '~/business/journal/views/Journal.vue';

@Component({ components: { Journal } })
export default class JournalPage extends Vue {
  async mounted(): Promise<void> {
    await this.$presenter.journalInstance.onMounted({ id: +this.$route.params.id });
  }
}
</script>
