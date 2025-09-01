<template>
  <div class="overview-bg-card">
    <BaseCard class="gap-2">
      <div class="flex items-center text-xl">
        <img :src="aaplLogo" alt="Apple Logo" class="w-5 h-5 mr-2" />
        <span>Apple</span>
      </div>

      <div class="flex flex-col gap-1">
        <div class="text-xs">Reveneue {{ allStockData.AAPL.lastQuarter }}</div>
        <div class="flex items-center">
          <div class="text-2xl mr-1">
            {{ allStockData.AAPL.lastRevenue }}
          </div>
          <div class="text-[13px]">
            <div :class="allStockData.AAPL.positive ? 'text-green-500' : 'text-red-500'">
              {{ allStockData.AAPL.difference }}
            </div>
            <div :class="allStockData.AAPL.positive ? 'text-green-500' : 'text-red-500'">
              {{ allStockData.AAPL.percentChange }} %
            </div>
          </div>
        </div>
        <div class="text-[8px]">In Bill USD</div>
      </div>
    </BaseCard>
    <BaseCard></BaseCard>
    <!-- <BaseCard></BaseCard>
    <BaseCard></BaseCard>
    <BaseCard></BaseCard>
    <BaseCard></BaseCard> -->
  </div>
</template>

<script setup>
import { useStockData } from "@/composables/useStockData";
import BaseCard from "./BaseCard.vue";
import aaplLogo from "@/assets/img/aapl.png";

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
