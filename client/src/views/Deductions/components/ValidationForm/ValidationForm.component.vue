<template>
  <v-container>
    <v-dialog v-model="showCalendar" width="290px">
      <v-date-picker v-model="selectedCalendarDate" scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="showCalendar = false"> Cancel </v-btn>
        <v-btn text color="primary" @click="saveCalendarDate"> OK </v-btn>
      </v-date-picker>
    </v-dialog>
    <v-row no-gutters dense>
      <v-col
        md="3"
        xs="10"
        class="mr-5"
        v-for="(label, index) in Object.keys(formattedDocument)"
        :key="`${index}_toplineinput`"
      >
        <v-combobox
          v-if="has(CommonHeaders, `${label}.suggestions`)"
          v-model="formattedDocument[label]"
          :items="[
            formattedDocument[label],
            ...get(CommonHeaders, `${label}.suggestions`, []),
            { header: `Can't find what you're looking for?` },
          ]"
          :label="get(CommonHeaders, `${label}.text`, label)"
          outlined
          dense
        >
        </v-combobox>
        <v-text-field
          v-else-if="has(CommonHeaders, `${label}.date`)"
          readonly
          v-model="formattedDocument[label]"
          :label="get(CommonHeaders, `${label}.text`, label)"
          @click="openCalendar(formattedDocument[label], label)"
          outlined
          dense
        ></v-text-field>
        <v-text-field
          v-else
          v-model="formattedDocument[label]"
          dense
          :label="get(CommonHeaders, `${label}.text`, label)"
          outlined
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { fromEntries } from '@/utils';
import { get, has } from 'lodash';
import { CommonHeaders } from '../../constants';
import {
  ValidationFormComputed,
  ValidationFormProps,
  ValidationFormData,
  ValidationFormMethods,
} from './ValidationForm.types';

const ValidationForm = Vue.extend<
  ValidationFormData,
  ValidationFormMethods,
  ValidationFormComputed,
  ValidationFormProps
>({
  name: 'validation-form',
  data() {
    return {
      CommonHeaders,
      showCalendar: false,
      selectedCalendarDate: '',
      activeLabel: '',
    };
  },
  props: {
    document: {
      required: true,
    },
  },
  computed: {
    formattedDocument() {
      return Object.entries(this.document)
        .filter(([key]) => {
          console.log('key: ', key, has(CommonHeaders, `${key}.disabled`));
          return !get(CommonHeaders, `${key}.disabled`, false);
        })
        .reduce((acc, [key, value]) => {
          if (has(CommonHeaders, `${key}.date`)) {
            return { ...acc, ...fromEntries([[key, value]]) };
          }
          return { ...acc, ...fromEntries([[key, value]]) };
        }, {});
    },
  },
  methods: {
    get,
    has,
    openCalendar(date: string, label: string) {
      this.showCalendar = true;
      this.selectedCalendarDate = date;
      this.activeLabel = label;
    },
    saveCalendarDate() {
      const newDate = fromEntries([[this.activeLabel, this.selectedCalendarDate]]);
      Object.assign(this.formattedDocument, newDate);
      this.showCalendar = false;
    },
  },
});

export default ValidationForm;
</script>

<style></style>
