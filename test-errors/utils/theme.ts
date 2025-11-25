/**
 * Утилита для управления темой приложения
 * Сохраняет и восстанавливает тему из localStorage
 */

export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'app-theme';
const DEFAULT_THEME: Theme = 'light';

/**
 * Получает текущую тему из localStorage
 * @returns Текущая тема или значение по умолчанию
 */
export function getTheme(): Theme {
  if (typeof localStorage === 'undefined') {
    return DEFAULT_THEME;
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return (stored as Theme) || DEFAULT_THEME;
}

/**
 * Устанавливает тему и сохраняет в localStorage
 * @param theme - Тема для установки
 */
export function setTheme(theme: Theme): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(THEME_STORAGE_KEY, theme);
  
  // Применяем тему к документу
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
}

/**
 * Переключает тему между light и dark
 * @returns Новая тема
 */
export function toggleTheme(): Theme {
  const current = getTheme();
  const newTheme: Theme = current === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  return newTheme;
}

/**
 * Инициализирует тему при загрузке
 */
export function initializeTheme(): void {
  if (typeof window === 'undefined') {
    return;
  }

  const theme = getTheme();
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
}
