<template>
  <v-container>
    <v-dialog v-model="showCalendar" width="290px">
      <v-date-picker v-model="selectedCalendarDate" scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="showCalendar = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="saveCalendarDate"> OK </v-btn>
      </v-date-picker>
    </v-dialog>
    <v-row no-gutters dense class="d-flex">
      <v-data-table
        v-model="selectedItems"
        :headers="headers"
        :items="updatedItems"
        id="validationtable"
        item-key="_id"
        show-select
        multi-sort
      >
        <template v-slot:item="props">
          <tr>
            <td>
              <v-simple-checkbox
                color="green"
                :ripple="false"
                :value="props.isSelected"
                @input="props.select($event)"
              ></v-simple-checkbox>
            </td>
            <td
              v-for="(headerName, index) in headers"
              :key="`${index}_${headerName.value}_item${props.item._id}`"
            >
              <div
                v-if="has(CommonHeaders, `${headerName.value}.date`)"
                @click="openCalendar(props.item[headerName.value], headerName.value, props.index)"
              >{{props.item[headerName.value] || '-'}}</div>
              <v-edit-dialog v-else
              :key="`${headerName.value}_dialogue_${props.item._id}`"
              :return-value.sync="props.item[headerName.value]"
              large>
                {{ props.item[headerName.value] }}
                <template v-slot:input>
                  <v-combobox
                    v-if="has(CommonHeaders, `${headerName.value}.suggestions`)"
                    v-model="props.item[headerName.value]"
                    :items="[
                      props.item[headerName.value],
                      ...get(CommonHeaders, `${headerName.value}.suggestions`, []),
                    ]"
                  ></v-combobox>
                  <v-text-field
                    v-else
                    v-model="props.item[headerName.value]"
                    label="Edit"
                    single-line
                    counter
                  ></v-text-field>
                </template>
              </v-edit-dialog>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { get, has, cloneDeep } from 'lodash';
import { DataTableHeader } from 'vuetify';
import { fromEntries } from '@/utils';
import { CommonHeaders } from '../../constants';
import {
  ValidationTableComputed,
  ValidationTableProps,
  ValidationTableData,
  ValidationTableMethods,
} from './ValidationTable.types';
import { DeductionItem } from '../../Deductions.types';

const ValidationTable = Vue.extend<
  ValidationTableData,
  ValidationTableMethods,
  ValidationTableComputed,
  ValidationTableProps
>({
  name: 'validation-table',
  data() {
    return {
      CommonHeaders,
      selectedItems: [] as DeductionItem[],
      showCalendar: false,
      selectedCalendarDate: '',
      activeLabel: '',
      activeIndex: 0,
      updatedItems: cloneDeep(this.items),
    };
  },
  props: {
    items: {
      required: true,
      default: [] as DeductionItem[],
    },
  },
  computed: {
    headers() {
      const headerObject = this.updatedItems.reduce(
        (acc, currDeductionItem) => Object.keys(currDeductionItem).reduce(
          (subAcc, headerKey) => (!has(subAcc, headerKey) && !get(CommonHeaders, `${headerKey}.disabled`, false)
            ? {
              ...fromEntries([
                [
                  headerKey,
                  {
                    value: headerKey,
                    text: headerKey,
                    ...get(CommonHeaders, headerKey, {}),
                  },
                ],
              ]),
              ...subAcc,
            }
            : subAcc),
          acc,
        ),
        {},
      );
      return Object.values(headerObject) as DataTableHeader[];
    },
  },
  methods: {
    get,
    has,
    openCalendar(date, label, index) {
      this.selectedCalendarDate = date;
      this.activeLabel = label;
      this.activeIndex = index;
      this.showCalendar = true;
    },
    saveCalendarDate() {
      const newItems = cloneDeep(this.updatedItems);
      const newDate = fromEntries([[this.activeLabel, this.selectedCalendarDate]]);
      Object.assign(newItems[this.activeIndex], newDate);
      this.updatedItems = newItems;
      this.showCalendar = false;
    },
  },
});

export default ValidationTable;
</script>

<style></style>
