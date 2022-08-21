<template>
  <modal @close="closeModal">
    <template #header>
      <p>{{ header }}</p>
    </template>
    <template #body>
      <p v-if="isQueryExist">Запрос был отправлен {{ date }} в {{ time }}</p>
      <p>Состояние запроса - {{ queryState }}</p>
    </template>
    <template #footer>
      <div class="flex justify-end space-x-5 mr-3 mt-3">
        <b-button
          v-for="({ variant, method, isDisabled, text }, index) in modalData.buttons"
          :key="index"
          :class="[ isDisabled ? 'cursor-not-allowed': '' ]"
          :disabled="!!isDisabled"
          size="sm"
          :variant="variant"
          @click="invokeMethod(method)"
        >
          {{ text }}
        </b-button>
      </div>
    </template>
  </modal>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import type { TMethod, TModalQueryData } from '../Domain';
import { searchStoreModule } from '../store';
import Modal from '~/components/Modal.vue';
import { formatDate, formatTime } from '~/helpers/date';
import { EQueryResultState } from '~/@types/domain';

@Component({ components: { Modal } })
export default class StateQueryModal extends Vue {
  @searchStoreModule.Getter modalData: TModalQueryData;

  private get header(): string {
    return this.modalData.header;
  }

  private get isQueryExist(): boolean {
    return this.modalData.data.res !== 0;
  }

  private get date(): string {
    if (this.isQueryExist) {
      return formatDate(this.modalData.data?.dcreated);
    }

    return null;
  }

  private get time(): string {
    if (this.isQueryExist) {
      return formatTime(this.modalData.data?.dcreated);
    }
    return null;
  }

  private get queryState(): EQueryResultState {
    return this.modalData.data.res;
  }

  private get queryId(): EQueryResultState {
    return this.modalData.data?.q_id;
  }

  private closeModal(): void {
    this.$presenter.searchInstance.onCloseModal();
  }

  private invokeMethod(method: TMethod): void {
    const { type, name, params } = method;
    if (type === 'presenter') {
      // @ts-ignore
      this.$presenter.searchInstance[name](params);
    }

    if (type === 'router') {
      // @ts-ignore
      this.$router[name](params);
    }
  }
}
</script>
