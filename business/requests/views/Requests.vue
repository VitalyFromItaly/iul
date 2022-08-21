<template>
  <dx-data-grid
    v-if="requests"
    id="gridID"
    :show-column-lines="true"
    :show-row-lines="true"
    :allow-column-resizing="true"
    :allow-column-reordering="true"
    :data-source="requests"
    :show-borders="true"
    :repaint-changes-only="true"
    :two-way-binding-enabled="true"
    :focused-row-enabled="true"
    key-expr="q_id"
  >
    <dx-column
      data-field="dcreated"
      data-type="date"
      format="dd.MM.yyyy"
      caption="Дата создания"
      width="15%"
    />
    <dx-column
      caption="Запрос"
      data-field="q_text"
      width="15%"
      cell-template="q_text"
    />
    <template #q_text="{ data }">
      <p v-if="data.data.q_text.iul_name ">
        {{ data.data.q_text.iul_name }}
      </p>
    </template>
    <dx-column
      caption="Состояние"
      data-field="q_state"
      width="15%"
    />
      <!-- cell-template="q_state" -->
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
  </dx-data-grid>
  <layout-empty-state v-else />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';
import type { TState, IPresenter, TMountPayload, TRequest } from '../Domain';
import { requestsStoreModule } from '../store';

@Component({ components: { DxDataGrid, DxColumn } })
export default class Requests extends Vue {
  @requestsStoreModule.State('internalState') state: TState;

  private presenter: IPresenter;

  private get requests(): TRequest[] {
    return this.state.requests;
  }

  get id(): number {
    return +this.$route.params.id;
  }

  public async mounted(): Promise<void> {
    this.presenter = this.$presenter.requestsInstance;
    const payload: TMountPayload = { id: this.id };

    await this.presenter.onMounted(payload);
  }
}
</script>
