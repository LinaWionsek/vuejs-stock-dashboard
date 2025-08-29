<template>
  <div class="overview-bg-card">
    <BaseCard>
      <div class="flex items-center text-xl">
      <img :src="aaplLogo" alt="Apple Logo" class="w-5 h-5 mr-2" />
      <span>APPLE</span>
       </div>
      <div class="text-xs">Reveneue {{ allStockData.AAPL.lastQuarter }}</div>

      <div class="flex items-center">
        <div class="text-2xl mr-1">
          {{ allStockData.AAPL.lastRevenue }}
        </div>
        <div class="text-[13px]">
          <div>{{ allStockData.AAPL.difference }}</div>
          <div>{{ allStockData.AAPL.percentChange }} %</div>
        </div>
      </div>
      <div class="text-[8px]">In Bill USD</div>
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
