<template>
  <!-- Object.entries wandelt das hereingegebene Objekt in dein Array um -->
  <div class="overview-bg-card">
    <BaseCard class="gap-2" v-for="value in allStockData" :key="value.name">
      <div class="flex items-center text-xl">
        <img :src="value.logo" :alt="value.name + 'logo'" class="h-5 mr-2" />
        <span>{{ value.name }}</span>
      </div>
      <div class="flex flex-col gap-1">
        <div class="text-xs">Reveneue {{ value.lastQuarter }}</div>
        <div class="flex items-center">
          <div class="text-2xl mr-1">
            {{ value.lastRevenue }}
          </div>
          <div class="text-[13px]">
            <div :class="value.positive ? 'text-green-500' : 'text-red-500'">
              {{ value.difference }}
            </div>
            <div :class="['flex','justify-end',value.positive ? 'text-green-500' : 'text-red-500']">
              {{ value.percentChange }} %
            </div>
          </div>
        </div>
        <div class="text-[8px]">In Bill USD</div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
import { useStockData } from "@/composables/useStockData";
import BaseCard from "./BaseCard.vue";

const { allStockData } = useStockData();
</script>

<style scoped>
.overview-bg-card {
  height: 191px;
  width: 1240px;
  border-radius: 20px;
  padding: 24px;
  background-color: #023a6233;
  gap: 20px;
}
</style>
