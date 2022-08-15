<template>
  <div>
    <header>
      <span v-for="(number, index) in codeNumbers" :key="index">{{ number }}</span>
    </header>
    <h1>{{ error.message }}</h1>
    <p v-if="error.description">
      {{ error.description }}
    </p>
    <p v-else>
      Вы перешли на страницу, которой не существует, была удалена или перемещена по другому адресу
    </p>
    <!-- <cds-link v-if="error.isLinkShown" :to="error.link" :text="error.linkName" />
    <cds-link v-else-if="error.statusCode === 404" to="/list" text="На страницу реестра документов" /> -->
    <footer class="cds-mt-m">
    </footer>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'nuxt-property-decorator';
@Component
export default class ErrorMainPage extends Vue {
  @Prop({ required: true }) error: any;

  mounted() {
    console.log(this.error);
  }

  get codeNumbers(): string[] {
    return String(this.error.statusCode).split('');
  }

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
</script>
