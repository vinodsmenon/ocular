import { createStorage, STORAGE_KEY } from '@storage/index';
import { createDataStore, DATA_STORE_KEY } from '@store/data';
import { createSettingsStore, SETTINGS_STORE_KEY } from '@store/settings';
import { registerSW } from 'virtual:pwa-register';
import { createLogger } from './utils/logger';
import { createApp } from 'vue';
import { i18n } from './i18n';
import { router } from './router';
import App from './app/App.vue';
import './styles/index.scss';

const { OAUTH_URI, OAUTH_CLIENT_ID, OAUTH_SCOPE } = import.meta.env;

const storage = createStorage({
  authUri: OAUTH_URI as string,
  clientId: OAUTH_CLIENT_ID as string,
  scope: OAUTH_SCOPE as string
});

const app = createApp(App);

app.provide(DATA_STORE_KEY, createDataStore(storage));
app.provide(SETTINGS_STORE_KEY, createSettingsStore(storage));
app.provide(STORAGE_KEY, storage);

app.use(i18n);
app.use(router);

app.mount('#app');

// Print info and register service worker
const logger = createLogger('app');
const date = new Date(import.meta.env.APP_BUILD_TIMESTAMP).toLocaleDateString();
const time = new Date(import.meta.env.APP_BUILD_TIMESTAMP).toLocaleTimeString();
logger.info(`Budgetler build on the ${date} at around ${time}`);

registerSW({
  onOfflineReady: () => logger.success('App available offline'),
  onNeedRefresh: () => logger.info('App updated, need to refresh...'),
  onRegistered: () => logger.success('Service worker registered'),
  onRegisterError: (e) => logger.error('Failed to register service-worker', e)
});
