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

<style lang="scss">
.el-col {
  margin-bottom: 30px;
}

.custom-menu-grid {
  .custom-card {
    border-radius: 15px;
    box-shadow: none;
    padding: 13px 15px;
    .item {
      &-icon {
        font-size: 42px;
        display: block;
        margin-bottom: 15px;
      }
      &-title {
        font-size: 30px;
      }
      &-description {
        font-size: 20px;
        width: 81%;
        height: 2.5em;
      }
    }
  }
}
</style>
