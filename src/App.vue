<template>
  <div class="flex items-center">
    <div class="symbol"></div>
    <h1 class="ml-6 text-white text-4xl font-medium">The Magnificent Seven Companies</h1>
  </div>

<OverviewBackgroundCard class="flex items-center justify-center relative">
  <img class="absolute right-2" src="../public/img/arrow.png" alt="">
  <BaseCard></BaseCard>
  <BaseCard></BaseCard>
  <BaseCard></BaseCard>
  <BaseCard></BaseCard>
  <BaseCard></BaseCard>
  <BaseCard></BaseCard>
</OverviewBackgroundCard>
<RevenueHistory>  <h2>Revenue last 3 years</h2>

    <h1>Willkommen!</h1>
    <p>Das ist eine wiederverwendbare Karte mit einem flexiblen Inhalt.</p>

    <div v-if="loading">Daten werden geladen...</div>
    <div v-else-if="error">Fehler: {{ error }}</div>
    <div v-else class="flex flex-wrap">
      
        <div class="flex w-40" v-for="(entry, index) in quarterAndRevenue" :key="index">
          {{ entry.quarter }} - {{ entry.revenue }}
        </div>
       
      
    </div>

</RevenueHistory>


</template>

<script setup>
import { onMounted } from 'vue'
import BaseCard from './components/BaseCard.vue'
import { useStockData } from './composables/useStockData'
import OverviewBackgroundCard from './components/OverviewBackgroundCard.vue'
import RevenueHistory from './components/RevenueHistory.vue'


// Hole Daten von der API (AAPL)
const { data, loading, error, fetchData, getOrder, getRevenue, revenue, getQuarter, quarter, getQuarterAndRevenue, quarterAndRevenue } = useStockData()

onMounted(async() => {
  await fetchData('META')
  getOrder()
  getRevenue()
  getQuarter()
  getQuarterAndRevenue()
  console.log('Daten wurden geladen', data)
  console.log('Sortierte Umsätze:', revenue)
  console.log('Sortierte Quarter:', quarter)
  console.log('Revenue und Quarter:', quarterAndRevenue)
})




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
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
}

.symbol {
  width: 96px;
  height: 32px;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  background: #39DAFF;
  position: absolute;
  left: 0;


}
</style>
