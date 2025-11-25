/**
 * Утилита для красивого логирования с поддержкой SSR
 * На сервере выводит синие логи, на клиенте - зелёные
 */

interface LogEntry {
  module: string;
  filePath: string;
  timestamp: Date;
  startTime?: Date;
  isServer: boolean;
}

// Глобальная переменная для отслеживания времени старта приложения
let appStartTime: Date | null = null;
const logStartTimes = new Map<string, Date>();

/**
 * Инициализирует таймер для отслеживания времени
 * @param key - Уникальный ключ для таймера
 */
export function startTimer(key: string) {
  // Инициализируем глобальное время старта приложения
  initializeAppStartTime();
  logStartTimes.set(key, new Date());
}

/**
 * Инициализирует время старта приложения
 */
function initializeAppStartTime(): Date {
  if (!appStartTime) {
    appStartTime = new Date();
  }
  return appStartTime;
}

/**
 * Основная функция логирования
 * @param config - Конфигурация логирования
 */
export function createLogger(config: LogEntry) {
  // @ts-ignore - process доступен в Nuxt
  const isServer = typeof process !== 'undefined' && !process.client;
  const now = new Date();
  const cleanPath = getCleanPath(config.filePath);
  const formattedDate = formatDate(now);
  const elapsedTime = calculateElapsedTime();

  const timestamp = `[${formattedDate}, timer - ${elapsedTime}]`;

  if (isServer) {
    // Синий цвет для сервера (ANSI escape code)
    const moduleLog = `\x1b[34m%s\x1b[0m`;
    const pathLog = `\x1b[36m%s\x1b[0m`; // Голубой для пути
    const timeLog = `\x1b[90m%s\x1b[0m`; // Серый для времени

    console.log(moduleLog, config.module, cleanPath, timestamp);
  } else {
    // На клиенте - каждый элемент на отдельной строке
    console.log(
      `%c${config.module}`,
      'color: #10b981; font-weight: 600; font-size: 12px;',
    );
    console.log(
      `%c${cleanPath}`,
      'color: #06b6d4; font-weight: 600; font-size: 12px;',
    );
    console.log(`%c${timestamp}`, 'color: #6b7280; font-size: 11px;');
  }
}

/**
 * Форматирует дату в русский формат (без секунд)
 * @param date - Дата для форматирования
 * @returns Отформатированная строка
 */
function formatDate(date: Date): string {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

/**
 * Вычисляет прошедшее время с момента старта приложения (с миллисекундами)
 * @returns Форматированная строка с прошедшим временем
 */
function calculateElapsedTime(): string {
  const startTime = initializeAppStartTime();
  const now = new Date();
  const elapsed = now.getTime() - startTime.getTime();
  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  const milliseconds = elapsed % 1000;

  const mins = String(minutes).padStart(2, '0');
  const secs = String(seconds).padStart(2, '0');
  const ms = String(milliseconds).padStart(3, '0');

  return `${mins}:${secs}:${ms}`;
}

/**
 * Возвращает только путь файла (без "test-errors" и без домена)
 * @param filePath - Полный путь файла
 * @returns Путь без корневой папки и домена
 */
function getCleanPath(filePath: string): string {
  // Обработка file:// URL
  let path = filePath;
  if (path.startsWith('file://')) {
    path = path.replace('file://', '');
  }

  // Убираем домен и _nuxt для клиентских путей
  if (path.includes('localhost') || path.includes('http')) {
    const urlMatch = path.match(/(?:https?:\/\/)?[^/]+\/_nuxt(.+)/);
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1];
    }
  }

  // Для сервера убираем абсолютный путь
  if (path.includes('\\')) {
    const parts = path.split('\\');
    const projectIndex = parts.findIndex((p) => p === 'test-errors');
    if (projectIndex !== -1) {
      return '/' + parts.slice(projectIndex + 1).join('/');
    }
  }

  // Для фронта (часто уже относительный путь)
  if (path.includes('/')) {
    const parts = path.split('/');
    const projectIndex = parts.findIndex((p) => p === 'test-errors');
    if (projectIndex !== -1) {
      return '/' + parts.slice(projectIndex + 1).join('/');
    }
  }

  return path;
}

/**
 * Получает время начала таймера
 * @param key - Ключ таймера
 * @returns Дата начала или undefined
 */
export function getTimerStart(key: string): Date | undefined {
  return logStartTimes.get(key);
}

/**
 * Удаляет таймер
 * @param key - Ключ таймера
 */
export function clearTimer(key: string) {
  logStartTimes.delete(key);
}
