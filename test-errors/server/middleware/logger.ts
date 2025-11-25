import { createLogger, startTimer } from '../../utils/logger';

const TIMER_KEY = 'server-init';

export default defineEventHandler((event) => {
  startTimer(TIMER_KEY);

  createLogger('1. Server middleware', {
    executionEnv: 'server',
    filePath: import.meta.url,
    componentStack: [],
  });

  // console.log('Request URL:', event.node.req.originalUrl);
});
