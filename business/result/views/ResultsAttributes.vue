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
  >
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
import { DxDataGrid, DxColumn } from 'devextreme-vue/data-grid';
import type { TAttribute } from '../Domain';

@Component({ components: { DxDataGrid, DxColumn } })
export default class SiteAttributes extends Vue {
  @Prop({ required: true }) attributes: TAttribute[];

  readonly imgAttrType = -1;

  get imgUrl(): string {
    const { baseUrl, port } = this.$config;
    return `${baseUrl}:${port}/res_png/`;
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
