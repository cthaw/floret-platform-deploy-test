<template>
  <div>
    <v-card-title> Deduction Validation </v-card-title>
    <v-container class="ma-0 pa-0">
      <v-col xs="12" class="pa-0">
        <validation-form
          :document="document"
        />
        <validation-table
          :items="items"
        />
      </v-col>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DeductionDocuments, DeductionItems } from '@/mocks';
import { ValidationForm, ValidationTable } from './components';

export default Vue.extend({
  components: {
    ValidationForm,
    ValidationTable,
  },
  data() {
    return {
      document: DeductionDocuments.find((doc) => doc._id === this.$route.params.id),
      items: DeductionItems,
    };
  },
});
</script>
