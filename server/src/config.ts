const {
  VUE_APP_PLATFORM_SERVER_BASE_URL: PLATFORM_SERVER_BASE_URL = '',
  VUE_APP_AUTH0_DOMAIN: AUTH0_DOMAIN = '',
  VUE_APP_AUTH0_CLIENT_ID: AUTH0_CLIENT_ID = '',
} = process.env;

const PLATFORM_SERVER_BASE_URL_REGEX = /{PLATFORM_SERVER_BASE_URL}/;
const AUTH0_DOMAIN_REGEX = /{AUTH0_DOMAIN}/;
const AUTH0_CLIENT_ID_REGEX = /{AUTH0_CLIENT_ID_REGEX}/;
const APP_JS_REGEX = /^\/js\/app\..*\.js/;

export {
  PLATFORM_SERVER_BASE_URL,
  PLATFORM_SERVER_BASE_URL_REGEX,
  AUTH0_DOMAIN,
  AUTH0_DOMAIN_REGEX,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_ID_REGEX,
  APP_JS_REGEX,
};
