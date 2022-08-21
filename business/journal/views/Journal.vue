<template>
  <dx-data-grid
    v-if="state.logs"
    id="gridID"
    :show-column-lines="true"
    :show-row-lines="true"
    :allow-column-resizing="true"
    :allow-column-reordering="true"
    :data-source="state.logs"
    :show-borders="true"
    :repaint-changes-only="true"
    :two-way-binding-enabled="true"
    :focused-row-enabled="true"
    key-expr="h_id"
  >
    <dx-column
      data-field="dcreated"
      data-type="date"
      format="dd.MM.yyyy"
      caption="Дата записи"
      width="15%"
    />
    <dx-column
      caption="Тип записи"
      data-field="info_type"
      width="20%"
    />
    <dx-column
      caption="Запрос"
      data-field="q_text"
      cell-template="q_text"
      width="20%"
    />
    <template #q_text="{ data }">
      <p v-if="data.data.q_text.iul_name ">
        {{ data.data.q_text.iul_name }}
      </p>
    </template>
    <dx-column
      caption="Сообщение"
      data-field="info_msg"
    />
    <dx-column
      caption="Пользователь"
      data-field="user_fullname"
    />
  </dx-data-grid>
  <layout-empty-state v-else />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';
import type { TState, IPresenter } from '../Domain';
import { journalStoreModule } from '../store';

@Component({ components: { DxDataGrid, DxColumn } })
export default class Journal extends Vue {
  @journalStoreModule.State('internalState') state: TState;

  private presenter: IPresenter;

  destroyed(): void {
    this.presenter.onResetState();
  }

  get id(): number {
    return +this.$route.params.id;
  }

  public async mounted(): Promise<void> {
    this.presenter = this.$presenter.journalInstance;
  }
}
</script>
