<template>
  <v-navigation-drawer
    app
    permanent
    expand-on-hover
    mini-variant-width="70"
    :mini-variant.sync="mini"
    class="secondary"
  >
    <v-list>
      <v-list-item to="/">
        <v-list-item-avatar class="mr-2">
          <v-img alt="Logo" src="@/assets/branding/logo-green.svg" contain />
        </v-list-item-avatar>
        <v-list-item-title class="mx-0">
          <v-img
            alt="Floret"
            src="@/assets/branding/floret-white.svg"
            contain
            max-height="35"
            max-width="90"
          />
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list nav>
      <v-list-item-group v-model="selectedItem" color="white">
        <v-list-item
          v-for="item in navbarItems"
          :key="item.title"
          :to="item.to"
          link
          dark
        >
          <v-list-item-icon class="mx-2">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="mx-0">
            <v-list-item-title
              ><h4 class="font-weight-medium">
                {{ item.title }}
              </h4></v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>
<script lang="ts">
import Vue from 'vue';

const NavigationDrawer = Vue.extend({
  name: 'navigation-drawer',
  data: () => ({
    navbarItems: [
      {
        title: 'Deductions',
        icon: 'mdi-file-document-multiple-outline',
        to: '/deductions',
      },
      {
        title: 'Profile',
        icon: 'mdi-account',
        to: '/profile',
      },
    ],
    selectedItem: null,
    mini: true,
  }),
});

export default NavigationDrawer;
</script>
<style scoped>
.theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled)
  * {
  color: #909db8 !important;
}
</style>
