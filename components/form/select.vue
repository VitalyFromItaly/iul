<template>
  <b-container fluid>
    <b-row class="my-1">
      <b-col sm="3">
        <label :for="internalId">{{ label }}</label>
      </b-col>
      <b-col sm="9">
        <b-form-select
          :id="internalId"
          v-model="internalValue"
          :options="options"
          :placeholder="placeholder"
          :required="required"
          :state="isValid"
          :type="type"
          :aria-describedby="internalId"
          v-on="events"
        />
        <b-form-invalid-feedback v-if="required" :id="internalId">
          {{ invalidMessage }}
        </b-form-invalid-feedback>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator';
import { v4 as uuidv4 } from 'uuid';
import { TSelectOption } from '~/@types/component';
@Component
export default class Select extends Vue {
  @Prop({ default: 'label' }) label: string;
  @Prop({ default: 'text' }) type: string;
  @Prop({ default: 'Обязательное поле для заполнения' }) invalidMessage: string;
  @Prop({ default: false }) required: boolean;
  @Prop({ default: [] }) options: TSelectOption[];
  @Prop({ default: 'Выбрать...' }) placeholder: string;
  @Prop({ default: uuidv4() }) id: string;
  @Prop() value: string | number;

  internalValue: string = 'Выберете';
  wasFocused: boolean = false;

  @Watch('value')
  onValueChanged(value: string): void {
    if (value) {
      this.internalValue = value;
    }
  }

  get events(): any {
    return {
      input: this._onInput,
      focus: this._onFocus
    };
  }

  get isValid(): boolean | null {
    if (!this.required) { return null; }

    if (this.wasFocused && !this.internalValue) { return false; }

    return null;
  }

  get internalId(): string {
    return `type-${this.type}${this.id}`;
  }

  _onFocus(): void {
    this.wasFocused = true;
  }

  _onInput(value: string) {
    this.internalValue = value;
    this.$emit('input', this.internalValue);
  }
}
</script>
