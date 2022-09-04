<template>
  <dx-data-grid
    v-if="attributes"
    id="gridID"
    :show-column-lines="true"
    :show-row-lines="true"
    :allow-column-resizing="true"
    :allow-column-reordering="true"
    :data-source="attributes"
    :show-borders="true"
    :repaint-changes-only="true"
    :two-way-binding-enabled="true"
    :focused-row-enabled="true"
    key-expr="attr_type_id"
    @exporting="onExporting"
  >
    <dx-selection mode="multiple" />
    <dx-export
      :texts="exportTextConfig"
      :enabled="true"
      :allow-export-selected-data="true"
    />
    <dx-column
      data-field="attr_type_name"
      caption="Атрибут"
      width="33%"
    />
    <dx-column
      caption="Значение"
      data-field="attr_value"
      width="66%"
      cell-template="attr_value"
    />
    <dx-column
      caption="Ссылка"
      data-field="imgUrl"
      :visible="false"
    />
    <template #attr_value="{ data: { data: { attr_value, attr_type_id, png, res_id } } }">
      <div v-if="attr_type_id === imgAttrType && png" class="image">
        <img :src="imgUrl + res_id" />
      </div>
      <p v-else>
        {{ attr_value }}
      </p>
    </template>
  </dx-data-grid>
</template>
<script lang='ts'>
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import { DxDataGrid, DxColumn, DxExport, DxSelection } from 'devextreme-vue/data-grid';
import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
// @ts-ignore
import { saveAs } from 'file-saver';
import type { TAttribute } from '../Domain';

@Component({ components: { DxDataGrid, DxColumn, DxExport, DxSelection } })
export default class SiteAttributes extends Vue {
  @Prop({ required: true }) attributes: TAttribute[];

  private readonly exportTextConfig = {
    exportAll: 'Экспортировать всю страницу',
    exportSelectedRows: 'Экспортировать выбранные строки',
    exportTo: 'Экспорт'
  };

  readonly imgAttrType = -1;

  get imgUrl(): string {
    const { baseUrl, port } = this.$config;
    return `${baseUrl}:${port}/res_png/`;
  }

  onExporting(e: any) {
    e.component.beginUpdate();
    e.component.columnOption('imgUrl', 'visible', true);

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(`Аттрибуты`);

    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Аттрибуты.xlsx');
      });
    }).then(() => {
      e.component.columnOption('imgUrl', 'visible', false);
      e.component.endUpdate();
    });
    e.cancel = true;
  }
}
</script>
<style scoped>
  .image {
    min-height: 300px;
    max-height: 500px;
    overflow-y: auto;
  }
</style>
