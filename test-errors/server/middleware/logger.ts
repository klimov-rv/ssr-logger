import { createLogger, startTimer } from '../../utils/logger';

const TIMER_KEY = 'server-init';

export default defineEventHandler((event) => {
  startTimer(TIMER_KEY);

  createLogger({
    module: '1. Server middleware',
    filePath: import.meta.url,
    timestamp: new Date(),
    startTime: new Date(),
    isServer: true,
  });

  // Можно добавить дополнительные логи для отладки
  // console.log('Request URL:', event.node.req.originalUrl);
});
