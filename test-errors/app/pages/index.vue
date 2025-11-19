<script setup lang="ts">
import { navLinks, type navCard } from '~~/data/navigationLinks';

const navigationCards = ref<navCard[]>(navLinks);
</script>

<template>
  <el-row class="custom-menu-grid flex flex-wrap gap-4" :gutter="30">
    <el-col
      v-for="card in navigationCards"
      :key="card.title"
      :sm="12"
      :span="24"
    >
      <el-card class="custom-card" @click="navigateTo(card.route)">
        <template #header>
          <div class="items-center">
            <span class="item-icon">{{ card.icon }}</span>
            <h3 class="item-title">{{ card.title }}</h3>
          </div>
        </template>
        <p class="item-description">{{ card.description }}</p>
      </el-card>
    </el-col>
  </el-row>
</template>

<style></style>
