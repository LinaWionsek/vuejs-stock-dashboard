<template>
  <div class="scroll-container">
  <div class="overview-bg-card flex">
    <BaseCard class="gap-2 overview-card" v-for="value in allStockData" :key="value.name">
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
            <div
              :class="[
                'flex',
                'justify-end',
                value.positive ? 'text-green-500' : 'text-red-500',
              ]"
            >
              {{ value.percentChange }} %
            </div>
          </div>
        </div>
        <div class="text-[8px]">In Bill USD</div>
      </div>
    </BaseCard>
  </div>
  </div>
  
</template>

<script setup>
import { useStockData } from "@/composables/useStockData";
import BaseCard from "./BaseCard.vue";

const { allStockData } = useStockData();
</script>

<style scoped>
.scroll-container {
  position: relative;

  /* // Fading-Effekte an den Seiten */
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 40px;
    height: 100%;
    z-index: 10;
    pointer-events: none;
  }
/* 023a6233 org */
  &::before {
    left: 0;
    background: linear-gradient(to right, #0095ff4a, transparent);
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  &::after {
    right: 0;
    background: linear-gradient(to left, #0095ff4a, transparent);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}


.overview-bg-card {
  height: 191px;
  width: 1240px;
  border-radius: 20px;
  padding: 24px;
  background-color: #023a6233;
  gap: 20px;
  overflow-x: auto;
  scrollbar-width: none;
}

.overview-card {
  /* important, because the cards would shrink if there istn enouth space */
  flex-shrink: 0;
}
</style>
