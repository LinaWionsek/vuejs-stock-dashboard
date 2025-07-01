<template>

<OverviewBackgroundCard class="flex justify-center items-center">
   <BaseCard class="flex flex-col">
    <h1>Willkommen!</h1>
    <p>Das ist eine wiederverwendbare Karte mit einem flexiblen Inhalt.</p>

    <div v-if="loading">Daten werden geladen...</div>
    <div v-else-if="error">Fehler: {{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="(entry, index) in quarterAndRevenue" :key="index">
          {{ entry.quarter }} - {{ entry.revenue }}
        </li>
       
      </ul>
    </div>
  </BaseCard>
</OverviewBackgroundCard>
<RevenueHistory>  <h2>Revenue last 3 years</h2> </RevenueHistory>


</template>

<script setup>
import { onMounted } from 'vue'
import BaseCard from './components/BaseCard.vue'
import { useStockData } from './composables/useStockData'
import OverviewBackgroundCard from './components/OverviewBackgroundCard.vue'
import RevenueHistory from './components/RevenueHistory.vue'


// Hole Daten von der API (AAPL)
const { data, loading, error, fetchData, getRevenue, revenue, getQuarter, quarter, getQuarterAndRevenue, quarterAndRevenue } = useStockData()

onMounted(async() => {
  await fetchData('AAPL')
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
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
}
</style>
