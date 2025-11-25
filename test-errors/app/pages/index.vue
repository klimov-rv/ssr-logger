<script setup lang="ts">
import { ref } from 'vue';
import { getTheme, toggleTheme } from '../../utils/theme';

definePageMeta({
  layout: 'default',
});
const currentTheme = ref(getTheme());

const handleThemeToggle = () => {
  const newTheme = toggleTheme();
  currentTheme.value = newTheme;
};
</script>

<template>
  <div class="home-page">
    <h1>Тесты SSR</h1>

    <section class="section">
      <h2>🎯 Навигация</h2>
      <ul class="custom-list">
        <li class="item" @click="navigateTo('/nuxt-ssr-1')">
          <h3 class="item-title">Порядок выполнения кода в Nuxt 3</h3>
          <p class="item-description">
            Посмотрите логи в консоли для понимания порядка выполнения
          </p>
        </li>
        <li class="item" @click="navigateTo('/test')">
          <h3 class="item-title">Тестовая страница</h3>
        </li>
      </ul>
    </section>

    <section class="section">
      <h2>💡 Текущая информация</h2>
      <div class="info-box">
        <p>
          Текущая тема:
          <strong>{{
            currentTheme === 'light' ? '☀️ Светлая' : '🌙 Тёмная'
          }}</strong>
        </p>
        <button @click="handleThemeToggle" class="demo-btn">
          Изменить тему программно
        </button>
      </div>
    </section>

    <section class="section">
      <h2>📖 Как использовать</h2>
      <div class="code-box">
        <p><strong>1. Логирование:</strong></p>
        <code>
          import { createLogger, startTimer } from '@/utils/logger';<br />
          startTimer('my-timer');<br />
          createLogger({ module: 'My Module', filePath: import.meta.url,
          timestamp: new Date(), isServer: false })
        </code>
      </div>
      <div class="code-box">
        <p><strong>2. Управление темой:</strong></p>
        <code>
          import { getTheme, setTheme, toggleTheme } from '@/utils/theme';<br />
          const theme = getTheme();<br />
          setTheme('dark');<br />
          toggleTheme();
        </code>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 0;
}

h1 {
  font-size: 32px;
  margin-bottom: 30px;
  color: var(--text-primary);
}

.section {
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 8px;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);

  h2 {
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 20px;
    color: var(--text-primary);
  }
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 10px 0;
    color: var(--text-secondary);

    strong {
      color: var(--text-primary);
    }
  }
}

.custom-list {
  list-style: none;
  padding: 0;
  margin: 0;

  .item {
    padding: 16px;
    margin-bottom: 16px;
    border: 2px solid var(--border-color);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: var(--bg-primary);

    &:hover {
      border-color: #10b981;
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
    }

    .item-title {
      margin: 0 0 8px 0;
      font-size: 16px;
      color: var(--text-primary);
    }

    .item-description {
      margin: 0;
      font-size: 14px;
      color: var(--text-secondary);
    }
  }
}

.info-box {
  padding: 16px;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;

  p {
    margin: 0 0 12px 0;
    color: var(--text-primary);
  }
}

.demo-btn {
  padding: 10px 16px;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #059669;
  }
}

.code-box {
  padding: 16px;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  margin-bottom: 12px;

  p {
    margin: 0 0 8px 0;
    font-weight: 600;
    color: var(--text-primary);
  }

  code {
    display: block;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: var(--text-secondary);
    overflow-x: auto;
    line-height: 1.6;
  }
}
</style>
