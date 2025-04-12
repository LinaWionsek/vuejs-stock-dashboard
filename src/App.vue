<template>


  <BaseCard>
    <h1>Willkommen!</h1>
    <p>Das ist eine wiederverwendbare Karte mit einem flexiblen Inhalt.</p>

    <!-- <div v-if="loading">Daten werden geladen...</div>
    <div v-else-if="error">Fehler: {{ error }}</div>
    <div v-else>
      <pre>{{ data }}</pre>
    </div> -->
  </BaseCard>


</template>

<script setup>
import { onMounted } from 'vue'
import BaseCard from './components/BaseCard.vue'
import { useStockData } from './composables/useStockData'

// Hole Daten von der API (AAPL)
const { data, loading, error, fetchData } = useStockData()

onMounted(() => {
  fetchData('AAPL')
  console.log('Daten wurden geladen', data)
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
