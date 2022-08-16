<template>
  <div class="flex flex-col justify-center mt-10 w-full">
    <b-form class="border bg-blue-50 rounded-md p-5" @submit.prevent="onSubmit" @reset="onReset">
      <form-input v-model="name" label="Наименование *" :required="true" />
      <form-select v-model="country" :options="countries" label="Страна" />
      <form-input v-model="id" label="Идентификатор" />
      <form-input v-model="address" label="Адрес" />
      <form-input v-model="boss" label="Руководитель" />
      <div class="flex justify-end space-x-5 mr-3 mt-3">
        <b-button type="reset" variant="danger">Сбросить</b-button>
        <b-button type="submit" variant="primary">Отправить</b-button>
      </div>
    </b-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import type { TCountryOption, TFormData } from '../Domain';
import { searchStoreModule } from '../store';

@Component
export default class Form extends Vue {
  @searchStoreModule.Getter countries: TCountryOption[];
  form = {} as TFormData;

  get country(): string {
    return this.form.country;
  }

  set country(country: string) {
    this.form.country = country;
    this.setForm();
  }

  get name(): string {
    return this.form.name;
  }

  set name(name: string) {
    this.form.name = name;
    this.setForm();
  }

  get id(): string {
    return this.form.id;
  }

  set id(id: string) {
    this.form.id = id;
    this.setForm();
  }

  get address(): string {
    return this.form.address;
  }

  set address(address: string) {
    this.form.address = address;
    this.setForm();
  }

  get boss(): string {
    return this.form.boss;
  }

  set boss(boss: string) {
    this.form.boss = boss;
    this.setForm();
  }

  private setForm(): void {
    this.$presenter.searchPresenter.onFormChanged(this.form);
  }

  private async onSubmit(): Promise<void> {
    await this.$presenter.searchPresenter.onSearchSubmit();
  }

  private onReset(): void {
    this.form = {} as TFormData;
    this.$presenter.searchPresenter.onResetForm();
  }
}
</script>
