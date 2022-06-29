<template>
  <div>
    <v-card-title> Deduction Files </v-card-title>
    <v-container>
      <v-row>
        <v-col md="6">
          <v-file-input
            type="file"
            label="Select files"
            v-model="filesToUpload"
            chips
            outline
            multiple
            counter
            dense
            enctype="multipart/form-data"
            ref="file"
          >
          </v-file-input>
        </v-col>
        <v-col md="1">
          <v-btn @click="submitFiles">Upload!</v-btn>
        </v-col>
      </v-row>
      <v-row class="my-5">
        <v-col md="7">
          <v-card outlined shaped>
            <v-list>
              <v-subheader>Deduction Files</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="file in files" :key="file">
                  <a>{{ file }}</a>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
      <v-col offset-xl="1" lg="12" xl="10" class="my-10">
        <document-explorer
          :items="DeductionDocuments"
          :moreActions="documentExplorerActions"
        ></document-explorer>
      </v-col>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getFiles, uploadFiles } from '../../services/deductionFiles';
import { DocumentExplorer } from './components';
import { DeductionDocuments } from '../../mocks';
import { DeductionDocument } from './Deductions.types';

export default Vue.extend({
  components: {
    DocumentExplorer,
  },
  data() {
    return {
      files: [] as string[],
      filesToUpload: [] as File[],
      DeductionDocuments,
      documentExplorerActions: [
        {
          name: 'View PDF',
          icon: 'mdi-download',
          onClick: () => null,
        },
        {
          name: 'Export to Excel',
          onClick: (): null => null,
        },
        {
          name: 'Validate Deduction',
          icon: 'mdi-clipboard-check-outline',
          onClick: (document: DeductionDocument) => { this.$router.push({ path: `/deductions/validation/${document._id}` }); },
        },
        {
          name: 'Delete Deduction',
          class: 'danger--text',
          icon: 'mdi-delete',
          onClick: () => null,
        },
      ],
    };
  },

  methods: {
    async getExistingFiles() {
      this.files = await getFiles();
    },

    async submitFiles() {
      if (this.filesToUpload.length > 0) {
        await uploadFiles(this.filesToUpload);
        await this.getExistingFiles();
        this.filesToUpload = [];
      }
    },
  },

  created() {
    this.getExistingFiles();
  },
});
</script>
