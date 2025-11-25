import { createLogger, startTimer, getTimerStart } from '../../utils/logger';
import { initializeTheme, getTheme } from '../../utils/theme';

const TIMER_KEY = 'plugin-setup';

export default defineNuxtPlugin({
  name: 'theme-plugin',
  async setup(nuxtApp) {
    // Инициализируем таймер при первом запуске
    if (!getTimerStart(TIMER_KEY)) {
      startTimer(TIMER_KEY);
    }

    // @ts-ignore
    const isServer = process.server;

    createLogger('2. Plugin setup', {
      executionEnv: isServer ? 'server' : 'client',
      filePath: import.meta.url,
      componentStack: [],
    });

    // На клиенте инициализируем тему и восстанавливаем её из localStorage
    // @ts-ignore
    if (process.client) {
      initializeTheme();
      const currentTheme = getTheme();

      // Логирование текущей темы если нужно:
      console.log('Loaded theme from localStorage:', currentTheme);
    }
  },
});
