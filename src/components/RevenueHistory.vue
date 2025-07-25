<template>
  <BaseCard class="revenue-history-card-size">
    <h2 class="text-xl font-bold">Revenue last 3 years</h2>

    <div v-if="loading">Daten werden geladen...</div>
    <div v-else-if="error">Fehler: {{ error }}</div>
    <div v-else class="flex flex-wrap">
      <div>
        Revenue:
        {{ allStockData }}
       
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from "./BaseCard.vue";
import { useStockData } from "@/composables/useStockData";
import { onMounted } from "vue";

// Hole Daten von der API (AAPL)
const {
  allStockData
} = useStockData();

onMounted(async () => {


});
</script>

<style scoped>
.revenue-history-card-size {
  width: 714px;
  height: 352px;
  gap: 20px;
  border-radius: 16px;
  padding: 20px 32px;
}
</style>
