<template>
  <div>
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <v-btn v-if="!$auth.isAuthenticated" @click="login">Log In</v-btn>
      <!-- show logout when authenticated -->
      <v-btn v-if="$auth.isAuthenticated" @click="logout">Log Out</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  methods: {
    login() {
      this.$auth.loginWithRedirect({});
    },

    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
});
</script>
