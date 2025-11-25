<template>
  <div class="theme-switcher">
    <button 
      @click="handleToggle" 
      :class="['theme-btn', currentTheme]"
      :title="`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`"
    >
      <span v-if="currentTheme === 'light'" class="icon">☀️</span>
      <span v-else class="icon">🌙</span>
      {{ currentTheme === 'light' ? 'Light' : 'Dark' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getTheme, setTheme, type Theme } from '../../utils/theme';

const currentTheme = ref<Theme>('light');

onMounted(() => {
  currentTheme.value = getTheme();
});

const handleToggle = () => {
  const newTheme: Theme = currentTheme.value === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  currentTheme.value = newTheme;
};
</script>

<style scoped>
.theme-switcher {
  display: inline-block;
}

.theme-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 2px solid #ddd;
  border-radius: 6px;
  background-color: #f5f5f5;
  color: #333;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.theme-btn:hover {
  background-color: #e9e9e9;
  border-color: #999;
}

.theme-btn.dark {
  background-color: #2a2a2a;
  color: #fff;
  border-color: #555;
}

.theme-btn.dark:hover {
  background-color: #3a3a3a;
  border-color: #888;
}

.icon {
  font-size: 18px;
}
</style>
