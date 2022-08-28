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
    <dx-sorting mode="multiple" />
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
      format="text"
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
import { DxDataGrid, DxColumn, DxPager, DxPaging, DxSorting } from 'devextreme-vue/data-grid';
import type { TState, IPresenter } from '../Domain';
import { journalStoreModule } from '../store';

@Component({ components: { DxDataGrid, DxColumn, DxPager, DxPaging, DxSorting } })
export default class Journal extends Vue {
  @journalStoreModule.State('internalState') state: TState;

  private presenter: IPresenter;

  destroyed(): void {
    this.$presenter.journalInstance.onResetState();
  }
}
</script>
