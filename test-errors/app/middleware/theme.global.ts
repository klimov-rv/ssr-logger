import { createLogger, startTimer, getTimerStart } from '../../utils/logger';

const TIMER_KEY = 'middleware-check';

export default defineNuxtRouteMiddleware((to, from) => {
  // Инициализируем таймер при первом запуске
  if (!getTimerStart(TIMER_KEY)) {
    startTimer(TIMER_KEY);
  }

  const timerStart = getTimerStart(TIMER_KEY);

  createLogger({
    module: '3. App middleware',
    filePath: import.meta.url,
    timestamp: new Date(),
    startTime: timerStart,
    isServer: false,
  });

  // Здесь можно добавить логику работы с темой
  // Например, проверка и восстановление темы при навигации
});
