import { createLogger, startTimer, getTimerStart } from '../../utils/logger';

const TIMER_KEY = 'middleware-check';

export default defineNuxtRouteMiddleware((to, from) => {
  if (!getTimerStart(TIMER_KEY)) {
    startTimer(TIMER_KEY);
  }
  // @ts-ignore
  const isServer = process.server;

  createLogger('3. App middleware', {
    executionEnv: isServer ? 'server' : 'client',
    filePath: import.meta.url,
    componentStack: [],
  });
});
