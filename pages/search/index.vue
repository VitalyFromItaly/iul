<template>
  <search-instance />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import SearchInstance from '~/business/search/views/Search.vue';

@Component({ components: { SearchInstance } })
export default class Search extends Vue {}
</script>
