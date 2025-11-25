export interface navCard {
  icon: string;
  title: string;
  description: string;
  route: string;
}

export const navLinks: navCard[] = [
  {
    icon: '🔄',
    title: 'Порядок выполнения кода в Nuxt 3',
    description: 'Посмотрите логи в консоли для понимания порядка выполнения',
    route: '/nuxt-ssr-1',
  },
  {
    icon: '🚀',
    title: 'Начало работы',
    description: 'Базовые шаги и примеры использования',
    route: '/getting-started',
  },
  {
    icon: '🧪',
    title: 'Тестовая страница',
    description: 'Тестирование функциональности приложения',
    route: '/test',
  },
  {
    icon: '❌',
    title: 'Ошибка 404',
    description: 'Ссылка на несуществующую страницу',
    route: '/nonexistent-page',
  },
];
