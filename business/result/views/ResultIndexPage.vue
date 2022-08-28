<template>
  <div v-if="!isLoading && results.length">
    <h3 v-if="!state.resultsInfo" class="text-center my-3 text-xl">
      Результаты запроса с id {{ id }}
    </h3>
    <div v-else class="flex flex-col items-center">
      <p> <span class="text-gray-600">Запрос:</span> {{ state.resultsInfo.q_text_show }} </p>
      <p> <span class="text-gray-600">Создан:</span> {{ state.resultsInfo.dcreated | formatDateFilter }} </p>
      <p> <span class="text-gray-600">Выполнен:</span> {{ state.resultsInfo.dstate | formatDateFilter }} </p>
    </div>
    <dx-data-grid
      id="gridID"
      :show-column-lines="true"
      :show-row-lines="true"
      :allow-column-resizing="true"
      :allow-column-reordering="true"
      :data-source="results"
      :show-borders="true"
      :repaint-changes-only="true"
      :two-way-binding-enabled="true"
      :focused-row-enabled="true"
      key-expr="res_id"
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
      <dx-selection mode="multiple" />
      <dx-group-panel :visible="true" empty-panel-text="Перетащите колонку для сортировки таблицы" />
      <dx-export
        :texts="exportTextConfig"
        :enabled="true"
        :allow-export-selected-data="true"
      />
      <dx-column
        data-field="res_type_name"
        caption="Тип"
        width="20%"
      />
      <dx-column
        caption="Источник"
        data-field="url"
        width="30%"
      />
      <dx-column
        caption="Наименование"
        data-field="title"
        width="30%"
      />
      <dx-column
        caption="Прошел фильтр"
        data-field="check_state"
        width="20%"
        cell-template="check_state"
      />
      <template #check_state="{ data: { data: { check_state } } }">
        <p v-if="check_state ">
          {{ checkStateDictionary[check_state] }}
        </p>
      </template>
      <dx-master-detail :enabled="true" template="attributes" />
      <template #attributes="{ data: { data: { attributes } } }">
        <attributes v-if="attributes" :attributes="attributes" />
        <template v-else>
          Атрибуты отсутствуют
        </template>
      </template>
    </dx-data-grid>
  </div>
  <layout-empty-state v-else />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { DxDataGrid, DxColumn, DxMasterDetail, DxExport, DxGroupPanel, DxSelection, DxPager, DxPaging } from 'devextreme-vue/data-grid';
import type { IPresenter, TState, TMountPayload, TResult } from '../Domain';
import { resultStoreModule } from '../store';
import { webpageSiteDictionary, checkStateDictionary } from '../Domain';
import Attributes from './ResultsAttributes.vue';
import { formatDateFilter } from '~/helpers/date';

@Component({ components: { DxDataGrid, DxColumn, DxMasterDetail, Attributes, DxExport, DxGroupPanel, DxSelection, DxPager, DxPaging }, filters: { formatDateFilter } })
export default class Result extends Vue {
  @resultStoreModule.State('internalState') state: TState;
  @resultStoreModule.Getter isLoading: boolean;
  private presenter: IPresenter;

  private readonly exportTextConfig = {
    exportAll: 'Экспортировать всю страницу',
    exportSelectedRows: 'Экспортировать выбранные строки',
    exportTo: 'Экспорт'
  };

  webpageSiteDictionary = webpageSiteDictionary;
  checkStateDictionary = checkStateDictionary;

  private get results(): TResult[] {
    return this.state.results || null;
  }

  get id(): number {
    return +this.$route.params.id;
  }

  public async mounted(): Promise<void> {
    this.presenter = this.$presenter.resultInstance;
    const payload: TMountPayload = {
      id: this.id
    };

    await this.presenter.onMounted(payload);
  }

  destroyed(): void {
    this.presenter.onResetState();
  }
}
</script>
