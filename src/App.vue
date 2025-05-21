<template>

<OverviewBackgroundCard class="flex justify-center items-center">
   <BaseCard class="flex flex-col">
    <h1>Willkommen!</h1>
    <p>Das ist eine wiederverwendbare Karte mit einem flexiblen Inhalt.</p>

    <div v-if="loading">Daten werden geladen...</div>
    <div v-else-if="error">Fehler: {{ error }}</div>
    <div v-else>
      <ul>
        <li v-for="(entry, index) in quarter" :key="index">
          {{ entry.quarter }}
        </li>
      </ul>
    </div>
  </BaseCard>
</OverviewBackgroundCard>
 


</template>

<script setup>
import { onMounted } from 'vue'
import BaseCard from './components/BaseCard.vue'
import { useStockData } from './composables/useStockData'
import OverviewBackgroundCard from './components/OverviewBackgroundCard.vue'


// Hole Daten von der API (AAPL)
const { data, loading, error, fetchData, getRevenue, revenue, getQuarter, quarter } = useStockData()

onMounted(async() => {
  await fetchData('AAPL')
  getRevenue()
  getQuarter()
  console.log('Daten wurden geladen', data)
  console.log('Sortierte Umsätze:', revenue)
  console.log('Sortierte Quarter:', quarter)
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
