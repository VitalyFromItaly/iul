<template>
  <div class="flex flex-col justify-center mt-10 w-full">
    <b-form class="border bg-blue-50 rounded-md p-5" @submit.prevent="onSubmit" @reset="onReset">
      <form-input v-model="form.name" label="Наименование*" :required="true" />
      <form-select v-model="form.country" :options="countries" label="Страна" />
      <form-input v-model="form.id" label="Идентификатор" />
      <form-input v-model="form.address" label="Адрес" />
      <form-input v-model="form.boss" label="Руководитель" />
      <div class="flex justify-end mr-3 mt-3">
        <b-button class="mr-3" type="reset" variant="danger">Сбросить</b-button>
        <b-button type="submit" variant="primary">Отправить</b-button>
      </div>
    </b-form>
  </div>
</template>

<script lang="ts">
import cloneDeep from 'lodash/cloneDeep';
import { Vue, Component } from 'nuxt-property-decorator';
import type { TCountryOption, TFormData } from '../Domain';
import { searchStoreModule } from '../store';

@Component
export default class Form extends Vue {
  @searchStoreModule.Getter countries: TCountryOption[];
  form = {} as TFormData;

  mounted(): void {
    this.form = this.$presenter.searchInstance.getCachedForm();
  }

  destroyed(): void {
    this.$presenter.searchInstance.onSaveFormInCache(this.form);
  }

  private async onSubmit(): Promise<void> {
    const clonedForm = cloneDeep(this.form);
    await this.$presenter.searchInstance.onSearchSubmit(clonedForm);
  }

  private onReset(): void {
    this.form = {} as TFormData;
    this.$presenter.searchInstance.onResetForm();
  }
}
</script>
