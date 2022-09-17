<template>
  <dx-data-grid
    v-if="requests"
    id="gridID"
    :show-column-lines="true"
    :show-row-lines="true"
    :selection="{ mode: 'single' }"
    :allow-column-resizing="true"
    :allow-column-reordering="true"
    :data-source="requests"
    :show-borders="true"
    :repaint-changes-only="true"
    :two-way-binding-enabled="true"
    :focused-row-enabled="true"
    key-expr="q_id"
    @selection-changed="onSelectionChanged"
  >
    <dx-paging :page-size="20" />
    <dx-pager
      :visible="true"
      :allowed-page-sizes="[5, 10, 20, 30, 'all']"
      display-mode="full"
      :show-page-size-selector="true"
      :show-info="true"
      :show-navigation-buttons="true"
    />
    <dx-column
      data-field="dcreated"
      data-type="date"
      format="dd.MM.yyyy"
      caption="Дата создания"
      width="15%"
    />
    <dx-column
      caption="Запрос"
      data-field="q_text_show"
      format="string"
      width="25%"
    />
    <dx-column
      caption="Статус"
      data-field="q_status_name"
      format="string"
      width="25%"
    />
    <dx-column
      caption="Состояние"
      data-field="q_state"
      width="15%"
      cell-template="queryState"
    />
    <template #queryState="{ data: { data } }">
      <p v-if="data.q_state_text_show">
        {{ data.q_state_text_show }}
      </p>
      <p v-else>
        {{ data.q_state }}
      </p>
    </template>
    <dx-column
      data-field="dstate"
      data-type="date"
      format="dd.MM.yyyy"
      caption="Дата состояния"
      width="15%"
    />
    <dx-column
      caption="Карточек найдено"
      data-field="q_card_found"
      width="15%"
    />
    <dx-column
      caption="Карточек прошло фильтр"
      data-field="q_card_filtered"
      width="15%"
    />
    <dx-column
      caption="Сайтов найдено"
      data-field="q_site_found"
      width="15%"
    />
    <dx-column
      caption="Сайтов прошло фильтр"
      data-field="q_site_filtered"
      width="15%"
    />
    <dx-toolbar>
      <dx-item
        location="after"
        template="toForm"
      />
      <dx-item
        location="after"
        template="toJournal"
      />
      <dx-item
        location="after"
        template="toResults"
      />
    </dx-toolbar>
    <template #toForm>
      <dx-button
        :disabled="!isRowChosen"
        icon="edit"
        hint="Уточнить"
        @click="openForm"
      />
    </template>
    <template #toJournal>
      <dx-button
        :disabled="!isRowChosen"
        icon="textdocument"
        hint="Журнал"
        @click="openJournal"
      />
    </template>
    <template #toResults>
      <dx-button
        :disabled="isResultButtonDisabled"
        icon="todo"
        hint="Результаты"
        @click="openResult"
      />
    </template>
  </dx-data-grid>
  <layout-empty-state v-else />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { DxDataGrid, DxColumn, DxToolbar, DxItem, DxPager, DxPaging } from 'devextreme-vue/data-grid';
import { DxButton } from 'devextreme-vue/button';
import type { TState, IPresenter, TMountPayload, TRequest } from '../Domain';
import { requestsStoreModule } from '../store';
import { EQueryResultState } from '~/@types/domain';
import { toReadableFormFormat } from '~/business/search/helpers/toReadableForm';

@Component({ components: { DxDataGrid, DxColumn, DxToolbar, DxItem, DxButton, DxPager, DxPaging } })
export default class Requests extends Vue {
  @requestsStoreModule.State('internalState') state: TState;
  chosenRow: TRequest = null;
  isDisabled = true;
  private presenter: IPresenter;

  private get requests(): TRequest[] {
    return this.state.requests;
  }

  get id(): number {
    return +this.$route.params?.id || null;
  }

  get queryId(): string {
    return this.chosenRow?.q_id.toString();
  }

  private get isRowChosen(): boolean {
    return !!this.chosenRow;
  }

  private get isResultButtonDisabled(): boolean {
    return !this.isChosenQueryDone;
  }

  private get isChosenQueryDone(): boolean {
    if (!this.chosenRow) { return false; }
    const { q_state } = this.chosenRow;

    return q_state === EQueryResultState.PROCESSED;
  }

  public async mounted(): Promise<void> {
    this.presenter = this.$presenter.requestsInstance;
    const payload: TMountPayload = { id: this.id };

    await this.presenter.onMounted(payload);
  }

  private destroyed(): void {
    this.presenter.onResetState();
  }

  onSelectionChanged({ selectedRowsData }: any): void {
    const [row] = selectedRowsData;
    this.chosenRow = row;
  }

  onNotSelectedRow(): void {
    this.$notification({ type: 'error', text: 'Необходимо выбрать строку таблицы' });
  }

  openForm(): void {
    if (!this.chosenRow) {
      this.onNotSelectedRow();
      return;
    }

    const { q_text } = this.chosenRow;
    const form = toReadableFormFormat(q_text);
    this.$presenter.searchInstance.onSaveFormInCache(form);
    this.$router.push({ name: 'search' });
  }

  openJournal(): void {
    if (!this.chosenRow) {
      this.onNotSelectedRow();
      return;
    }

    this.$router.push({ name: 'journal-id', params: { id: this.queryId } });
  }

  openResult(): void {
    if (!this.isChosenQueryDone) {
      this.onNotSelectedRow();
      return;
    }

    this.$router.push({ name: 'result-id', params: { id: this.queryId } });
  }
}
</script>
