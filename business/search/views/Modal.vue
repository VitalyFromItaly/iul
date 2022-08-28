<template>
  <modal @close="closeModal">
    <template #header>
      <p>{{ header }}</p>
    </template>
    <template #body>
      <p v-if="modalData.data.res === EQueryResultState.NEVER">
        Запрос создан. Для просмотра хода выполнения перейдите в раздел
        <nuxt-link class="text-blue-400 underline" :to="{ name: 'journal' }" >Запросы</nuxt-link>
      </p>
      <div v-else>
        <p>Запрос был отправлен {{ date }} в {{ time }}</p>
        <p>Состояние запроса - {{ stateText }}</p>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end mt-3">
        <b-button
          v-for="({ variant, method, isDisabled, text }, index) in modalData.buttons"
          :key="index"
          :class="[ isDisabled ? 'cursor-not-allowed': '' ]"
          :disabled="!!isDisabled"
          class="ml-3"
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

  EQueryResultState = EQueryResultState;

  destroyed(): void {
    this.$presenter.searchInstance.onResetModal();
  }

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

  private get stateText(): string {
    return this.modalData.data.q_state_text_show;
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
