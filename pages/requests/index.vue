<template>
  <requests />
</template>
<script lang='ts'>
import { Vue, Component } from 'nuxt-property-decorator';
import Requests from '~/business/requests/views/Requests.vue';
@Component({ components: { Requests } })
export default class RequestsPage extends Vue {
}
</script>
