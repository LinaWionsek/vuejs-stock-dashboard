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

import aaplLogo from "@/assets/img/aapl.png";

// Hole Daten von der API (AAPL)
const { addStockToGlobal, isReady } = useStockData();

onMounted(async () => {
  isReady.value = false
  // Die "Magnificent 7" laden
  await Promise.all([
    addStockToGlobal('AAPL', 'Apple', aaplLogo, 3, 1),
    // addStockToGlobal('AMZN', 7, 1),
    // addStockToGlobal('GOOG', 3, 1),
    // addStockToGlobal('META', 3, 1),
    // addStockToGlobal('MSFT', 7, 1),
    // addStockToGlobal('NVDA', 3, 1),
    // addStockToGlobal('TSLA', 13, 1)
  ])

  // Jetzt sind alle fertig
  isReady.value = true
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
