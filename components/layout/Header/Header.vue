<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header>
    <b-navbar class="px-4" toggleable="sm" type="dark" variant="primary">
      <b-navbar-brand :to="{ name: 'search' }">
        ИЮЛ
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse" />
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <user />
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import User from '~/business/user/views/User.vue';

@Component({ components: { User } })
export default class Header extends Vue {
}
</script>
