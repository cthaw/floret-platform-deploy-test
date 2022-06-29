<template>
  <v-container>
    <v-row class="d-flex justify-end">
      <v-col sm="2" class="ma-0">
        <v-combobox
          v-model="selectedDistributorFilters"
          :items="distributorFilters"
          label="Distributor"
          multiple
          outlined
          dense
          small-chips
        ></v-combobox>
      </v-col>
      <v-col sm="2" class="ma-0">
        <v-combobox
          v-model="selectedStatusFilters"
          :items="statusFilters"
          label="Status"
          multiple
          outlined
          dense
          small-chips
        ></v-combobox>
      </v-col>
      <v-col sm="2" class="ma-0">
        <v-combobox
          v-model="selectedTypeFilters"
          :items="typeFilters"
          label="Type"
          multiple
          outlined
          dense
          small-chips
        ></v-combobox>
      </v-col>
      <v-tooltip
        right
        v-for="(action, index) in moreActions.filter((action) => action.icon)"
        :key="`${index}_tooltip`"
      >
        <template v-slot:activator="{ on: tooltip }">
          <v-icon dense v-on="{ ...tooltip }" class="mx-3">{{
            action.icon
          }}</v-icon>
        </template>
        <span>{{ action.name }}</span>
      </v-tooltip>
    </v-row>
    <v-data-table
      v-model="selectedItems"
      show-select
      multi-sort
      item-key="name"
      :headers="headers"
      :items="items"
      :search="search"
      id="deductionstable"
    >
      <template v-slot:item[data-table-select]="{ on, props }">
        <v-simple-checkbox
          color="green"
          v-bind="props"
          v-on="on"
        ></v-simple-checkbox>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on: tooltip }">
            <td v-on="{ ...tooltip }" class="truncate">
              {{ item.name }}
            </td>
          </template>
          <span>{{ item.name }}</span>
        </v-tooltip>
      </template>
      <template v-slot:[`item.invoiceDate`]="{ item }">
        <td>
          {{ item.invoiceDate }}
        </td>
      </template>
      <template v-slot:[`item.uploaded`]="{ item }">
        <td>
          {{ item.uploaded }}
        </td>
      </template>
      <template v-slot:[`item.more`]="{ item }">
        <td>
          <v-menu top offset-x>
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">mdi-dots-horizontal</v-icon>
            </template>
            <v-list>
              <v-list-item
                link
                v-for="action in moreActions"
                :key="`${item.name}_${action.name}`"
              >
                <v-list-item-title
                  :class="action.class"
                  @click="action.onClick(item)"
                  >{{ action.name }}</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </td>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-empty-function */
import Vue from 'vue';
import {
  DocumentExplorerComputed,
  DocumentExplorerData,
  DocumentExplorerMethods,
  DocumentExplorerProps,
} from './DocumentExplorer.types';
import {
  DeductionDocument,
} from '../../Deductions.types';

const useFilter = (selectedFilters: string[]) => (val: string) => (
  selectedFilters.length > 0 ? selectedFilters.includes(val) : true
);

// eslint-disable-next-line max-len
const DocumentExplorer = Vue.extend<
  DocumentExplorerData,
  DocumentExplorerMethods,
  DocumentExplorerComputed,
  DocumentExplorerProps
>({
  name: 'document-explorer',
  data() {
    return {
      search: '',
      selectedItems: [],
      selectedDistributorFilters: [],
      selectedStatusFilters: [],
      selectedTypeFilters: [],
    };
  },
  props: {
    items: {
      required: true,
      default: [] as DeductionDocument[],
    },
    moreActions: {
      required: true,
    },
  },
  methods: {
  },
  computed: {
    headers() {
      const {
        selectedDistributorFilters,
        selectedStatusFilters,
        selectedTypeFilters,
      } = this;
      return [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Distributor',
          value: 'distributor',
          filterable: true,
          filter: useFilter(selectedDistributorFilters),
        },
        {
          text: 'Type',
          value: 'type',
          filterable: true,
          filter: useFilter(selectedTypeFilters),
        },
        {
          text: 'Status',
          value: 'status',
          filterable: true,
          filter: useFilter(selectedStatusFilters),
        },
        {
          text: 'Invoice Date',
          value: 'invoiceDate',
        },
        {
          text: 'Uploaded',
          value: 'uploaded',
        },
        {
          text: 'Uploaded by',
          value: 'uploadedBy',
        },
        {
          text: 'Size',
          value: 'size',
        },
        {
          text: '',
          value: 'more',
          sortable: false,
        },
      ];
    },
    distributorFilters() {
      const { items } = this;
      const filters = items.reduce(
        (acc, curr) => (acc.includes(curr.distributor) ? acc : [...acc, curr.distributor]),
        [] as DeductionDocument['distributor'][],
      );
      return filters;
    },
    statusFilters() {
      return ['In Review', 'Complete'];
    },
    typeFilters() {
      const { items } = this;
      const filters = items.reduce(
        (acc, curr) => (acc.includes(curr.type) ? acc : [...acc, curr.type]),
        [] as DeductionDocument['type'][],
      );
      return filters;
    },
  },
});

export default DocumentExplorer;
</script>

<style>
.truncate {
  max-width: 5vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
