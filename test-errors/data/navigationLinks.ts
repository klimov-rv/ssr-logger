export interface navCard {
  icon: string;
  title: string;
  description: string;
  route: string;
}

export const navLinks: navCard[] = [
  {
    icon: '🦉',
    title: 'С чего начать?',
    description: 'Базовые шаги для новичка',
    route: '/getting-started',
  },
  {
    icon: '🎁',
    title: 'Telegram Gifts',
    description: 'Что это и как использовать',
    route: '/telegram-gifts',
  },
  {
    icon: '💰',
    title: 'Купить TON',
    description: 'Способы покупки токена',
    route: '/buy-ton',
  },
  {
    icon: '🎮',
    title: 'Заработать TON',
    description: 'Активные и пассивные способы заработка',
    route: '/earn-ton',
  },
];
