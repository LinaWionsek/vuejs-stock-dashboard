<template>
  <div class="flex items-center">
    <div class="symbol"></div>
    <h1 class="ml-6 text-white text-4xl font-medium">The Magnificent Seven Companies</h1>
  </div>

  <CurrentRevenue class="flex items-center justify-center relative">
    <img class="absolute right-2" src="../public/img/arrow.png" alt="" />
    
  </CurrentRevenue>
  <RevenueHistory> <h2>Revenue last 3 years</h2> </RevenueHistory>
</template>

<script setup>

import RevenueHistory from "./components/RevenueHistory.vue";
import CurrentRevenue from "./components/CurrentRevenue.vue";

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
