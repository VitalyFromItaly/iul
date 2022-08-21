<template>
  <div>
    <h3 class="text-center my-3 text-xl">
      Результаты по запросы 
    </h3>
    <dx-data-grid
      v-if="sites"
      id="gridID"
      :show-column-lines="true"
      :show-row-lines="true"
      :allow-column-resizing="true"
      :allow-column-reordering="true"
      :data-source="sites"
      :show-borders="true"
      :repaint-changes-only="true"
      :two-way-binding-enabled="true"
      :focused-row-enabled="true"
      key-expr="res_id"
    >
      <dx-column
        data-field="webpage_type_id"
        caption="Тип"
        width="20%"
        cell-template="webpage_type_id"
      />
      <template #webpage_type_id="{ data: { data: { webpage_type_id } } }">
        <p v-if="webpage_type_id" class="text-left">
          {{ webpageSiteDictionary[webpage_type_id] }}
        </p>
      </template>
      <dx-column
        caption="Источник"
        data-field="url"
        width="30%"
      />
      <dx-column
        caption="Наименование"
        data-field="domain"
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
        <sites-attributes v-if="attributes" :attributes="attributes" />
        <template v-else>Атрибуты отсутствуют</template>
      </template>
    </dx-data-grid>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'nuxt-property-decorator';
import { DxDataGrid, DxColumn, DxMasterDetail } from 'devextreme-vue/data-grid';
import { resultStoreModule } from '../store';
import type { TSite, TState } from '../Domain';
import { webpageSiteDictionary, checkStateDictionary } from '../Domain';
import SitesAttributes from './ResultsAttributes.vue';

@Component({ components: { DxDataGrid, DxColumn, DxMasterDetail, SitesAttributes } })
export default class SitesTable extends Vue {
  @resultStoreModule.State('internalState') state: TState;

  webpageSiteDictionary = webpageSiteDictionary;
  checkStateDictionary = checkStateDictionary;

  private get sites(): TSite[] {
    return this.state.results || null;
  }
}
</script>
