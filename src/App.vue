<template>
  <div v-if="isReady">
    <div class="flex items-center">
      <div class="symbol"></div>
      <h1 class="ml-6 text-white text-4xl font-medium">The Magnificent Seven Companies</h1>
    </div>
    <div class="flex flex-col items-center">
      <CurrentRevenue class="flex items-center justify-center relative mt-12">
        <img class="absolute right-2" src="../public/img/arrow.png" alt="" />
      </CurrentRevenue>
      <div class="flex gap-8 mt-8 mb-8">
        <RevenueHistory></RevenueHistory>
        <RevenueBreakdown></RevenueBreakdown>
      </div>
    </div>
  </div>

  <div v-else class="text-white text-xl flex justify-center items-center h-screen">
  Load Data ...
  </div>
</template>

<script setup>
import RevenueHistory from "./components/RevenueHistory.vue";
import CurrentRevenue from "./components/CurrentRevenue.vue";
import RevenueBreakdown from "./components/RevenueBreakdown.vue";
import { useStockData } from "./composables/useStockData";
import { onMounted } from "vue";

// Hole Daten von der API (AAPL)
const { buildAllStockData, isReady } = useStockData();

onMounted(async () => {
  buildAllStockData();
});
</script>

<style>
body {
  margin: 0;
}

#app {
  width: 100vw;
  min-height: 100vh;
  padding: 100px;
  box-sizing: border-box;
  position: relative;
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011f35 100%);
}

.symbol {
  width: 96px;
  height: 32px;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  background: #39daff;
  position: absolute;
  left: 0;
}
</style>
