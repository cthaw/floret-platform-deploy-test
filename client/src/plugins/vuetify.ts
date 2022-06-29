import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#51B52C',
        secondary: '#18253F',
        danger: '#EF431F',
        grey: '#7F8AA0',
        lightgrey: '#CED4E0',
      },
    },
  },
});
