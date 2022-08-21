<template>
  <div class="flex flex-col items-center justify-center mt-5">
    <h3 class="text-2xl">Нет данных для отображения</h3>
    <p class=" text-gray-500">Вы можете воспользоваться
      <nuxt-link class="text-blue-400 underline" :to="{ name: 'search' }"> поиском </nuxt-link>
    </p>
    <slot></slot>
  </div>
</template>
<script lang='ts'>
import { Vue, Component } from 'nuxt-property-decorator';
@Component
export default class LayoutEmptyState extends Vue {}
</script>
