<template>
  <BaseCard class="revenue-history-card-size">
    <h2 class="text-xl font-bold">Revenue last 3 years</h2>

    <div v-if="loading">Daten werden geladen...</div>
    <div v-else-if="error">Fehler: {{ error }}</div>
    <div v-else class="flex flex-wrap">
      <div>
        <canvas ref="canvasRef"></canvas>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from "./BaseCard.vue";
import { useStockData } from "@/composables/useStockData";
import { onMounted, onBeforeUnmount, ref } from "vue";
import { Chart } from "chart.js/auto";


const canvasRef = ref(useStockData);
let chart = null;

onMounted(() => {
  chart = new Chart(canvasRef.value, {
    type: "line", 
    data: {
      labels: ["A", "B", "C", "D"],
      datasets: [
        {
          label: "Beispiel",
          data: [12, 19, 3, 5],
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
      },
    },
  });
});

onBeforeUnmount(() => {
  chart?.destroy();
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
