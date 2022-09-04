<template>
  <div>
    <header>
      <span v-for="(number, index) in codeNumbers" :key="index">{{ number }}</span>
    </header>
    <h1>{{ error.message }}</h1>
    <p v-if="error.description">
      {{ error.description }}
    </p>
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
