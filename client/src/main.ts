import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from './config';
import { Auth0Plugin } from './auth';

const domain: string = AUTH0_DOMAIN;
const clientId: string = AUTH0_CLIENT_ID;

// Install the authentication plugin
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState: any) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
