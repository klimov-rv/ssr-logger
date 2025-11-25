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
    const timerStart = getTimerStart(TIMER_KEY);

    createLogger({
      module: '2. Plugin setup',
      filePath: import.meta.url,
      timestamp: new Date(),
      startTime: timerStart,
      isServer: isServer,
    });

    // На клиенте инициализируем тему и восстанавливаем её из localStorage
    // @ts-ignore
    if (process.client) {
      initializeTheme();
      const currentTheme = getTheme();
      
      // Можно добавить логирование текущей темы если нужно:
      // console.log('Loaded theme from localStorage:', currentTheme);
    }
  },
});
