<template>
  <b-navbar toggleable="sm" class="mx-0 bg-gray-300 text-gray-900">
    <b-navbar-toggle target="nav" />
    <b-collapse id="nav" is-nav>
      <b-navbar-nav>
        <b-nav-item v-for="(page, index) in pages" :key="index" :active="page.isActive" :to="{ name: page.name }">
          {{ page.rusNamePage }}
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { EPages, ELinks } from '~/@types/domain';
type TTabLink = {
  name: string;
  rusNamePage: string;
  isActive: boolean;
};

@Component
export default class Navigation extends Vue {
  EPages = EPages;

  currentPage: string = '';

  @Watch('$route.path', { immediate: true })
  onPathChanged(path: string): void {
    this.currentPage = path.substring(1);
  }

  get pages(): TTabLink[] {
    return Object.values(this.EPages).map(page => ({ name: page, rusNamePage: ELinks[page], isActive: this.currentPage === page }));
  }
}
</script>
