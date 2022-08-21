<template>
  <result-index-page />
</template>
<script lang='ts'>
import { Vue, Component } from 'nuxt-property-decorator';
import ResultIndexPage from '~/business/result/views/ResultIndexPage.vue';
@Component({ components: { ResultIndexPage } })
export default class ResultPage extends Vue {}
</script>
