# Порядок выполнения кода в Nuxt 3 (SSR-режим): От сервера до клиента

Давайте разберёмся, как Nuxt 3 выполняет код в SSR-режиме, от начального запроса до рендеринга страницы. Это поможет вам оптимизировать загрузку и избежать "глюков" при работе с данными, зависящими от клиента (например, тема из localStorage).

## 1. Общий поток выполнения в SSR

Когда пользователь заходит на ваш сайт, Nuxt 3 выполняет код в следующем порядке:

1. **Серверные мидлвары** (`server/middleware/`)
2. **Плагины** (`app/plugins/`)
3. **Серверные маршруты** (`server/routes/`)
4. **Клиентские мидлвары** (`app/middleware/`)
5. **Компоновщики страницы** (`app/layout/`, `app/page.vue`)
6. **Код страницы**

## 2. Детальный разбор этапов

### Этап 1: Серверные мидлвары (`server/middleware/`)

**Что происходит**: Первым делом выполняются серверные мидлвары (Node.js-контекст).

```typescript
// server/middleware/logger.ts
export default defineEventHandler((event) => {
  console.log('Server middleware - runs first on every request');
  // Здесь можно:
  // - Логировать запросы
  // - Модифицировать запрос/ответ
  // - Завершить запрос (например, вернуть 404)
});
```

**Практика**: Создайте логгер, который фиксирует время начала обработки запроса.

### Этап 2: Плагины (`app/plugins/`)

**Что происходит**: Выполняются плагины, которые могут быть как серверными, так и клиентскими.

```typescript
// app/plugins/theme.ts
export default defineNuxtPlugin({
  name: 'theme-plugin',
  async setup(nuxtApp) {
    console.log('Plugin setup - runs on both server and client');

    // Важно: localStorage доступен только в браузере
    if (process.client) {
      const theme = localStorage.getItem('theme');
      console.log('Client-side theme:', theme);
    }
  },
});
```

**Практика**: Создайте плагин, который пытается прочитать тему из localStorage, но делает это только на клиенте.

### Этап 3: Серверные маршруты (`server/routes/`)

**Что происходит**: Если запрос соответствует серверному маршруту.

```typescript
// server/routes/test.ts
export default defineEventHandler((event) => {
  console.log('Server route handler');
  return { message: 'Hello from server route' };
});
```

**Практика**: Создайте маршрут, который возвращает текущую тему (из куки, так как localStorage недоступен на сервере).

### Этап 4: Клиентские мидлвары (`app/middleware/`)

**Что происходит**: Выполняются на клиенте перед навигацией.

```typescript
// app/middleware/theme.global.ts
export default defineNuxtRouteMiddleware((to, from) => {
  console.log('Client middleware - runs before page navigation');

  if (process.client) {
    const theme = localStorage.getItem('theme');
    console.log('Current theme from localStorage:', theme);
  }
});
```

**Практика**: Создайте мидлвар, который устанавливает тему в store до рендеринга страницы.

### Этап 5: Компоновщики и страницы

**Что происходит**: Выполняется код компоновщиков и конкретной страницы.

```typescript
// app/layout/default.vue
<script setup>
  console.log('Layout script - runs on both server and client');
</script>
```

## 3. Практические задачи для отладки порядка выполнения

### Задача 1: Логирование этапов

Создайте файлы с консольными логированиями в каждом из этапов:

1. `server/middleware/logger.ts`
2. `app/plugins/logger.ts`
3. `app/middleware/logger.global.ts`
4. `app/layout/default.vue`
5. `app/pages/index.vue`

### Задача 2: Работа с темой

Реализуйте правильную работу с темой, учитывая SSR:

```typescript
// 1. В плагине:
export default defineNuxtPlugin({
  setup() {
    const theme = useState('theme', () => 'light'); // Состояние, доступное и на сервере, и на клиенте

    if (process.client) {
      // На клиенте - проверяем localStorage
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) theme.value = savedTheme;
    }

    // Добавляем наблюдение за изменениями
    watch(theme, (newTheme) => {
      if (process.client) {
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    });

    return {
      provide: {
        theme,
      },
    };
  },
});
```

### Задача 3: Оптимизация загрузки

Чтобы избежать "глюков" при загрузке:

```typescript
// В вашем компоненте:
const theme = useState('theme');
const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
  // Здесь можно безопасно работать с DOM и localStorage
});
```

## 4. Рекомендации для работы в SSR

1. **Всегда проверяйте `process.client`/`process.server`** при работе с API браузера.
2. **Используйте `useState`** для данных, которые должны быть доступны и на сервере, и на клиенте.
3. **Для localStorage** используйте стратегию:
   - Чтение из куки на сервере
   - Синхронизация с localStorage на клиенте 

## 5. Полезные инструменты

- `useState`: Для состояния, общего для сервера и клиента
- `useCookie`: Для работы с куками
- `onMounted`: Для кода, который должен выполняться только на клиенте после монтирования

## 6. Порядок выполнения при гидратации

1. Сервер рендерит HTML
2. Клиент загружает JS
3. Происходит гидратация (связывание серверного HTML с клиентским JS)
4. Выполняются `onMounted` хуки

**Важно**: Код в `onMounted` выполняется только на клиенте после гидратации!

## Практика: Полный пример с темой

1. Создайте серверный мидлвар, который читает тему из куки
2. Создайте плагин, который синхронизирует тему между кукой и localStorage
3. Создайте компонент, который правильно отображает тему без фликера

Этот подход поможет вам понять поток выполнения и создавать более оптимизированные SSR-приложения в Nuxt 3.
