<template>
  <div class="layout-wrapper">
    <header class="layout-header">
      <nav class="navbar">
        <div class="nav-left">
          <h1>Nuxt App</h1>
        </div>
        <div class="nav-right">
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
    <main class="layout-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import ThemeSwitcher from '../components/ThemeSwitcher.vue';
</script>

<style scoped>
.layout-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-primary, #ffffff);
  color: var(--text-primary, #000000);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.layout-header {
  background-color: var(--bg-secondary, #f5f5f5);
  border-bottom: 2px solid var(--border-color, #ddd);
  padding: 0;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 16px 20px;
}

.nav-left h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.layout-main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
}

/* Переменные для светлой темы */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #000000;
  --text-secondary: #666666;
  --border-color: #ddd;
}

/* Переменные для тёмной темы */
[data-theme='dark'] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2a2a2a;
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --border-color: #444;
}
</style>
