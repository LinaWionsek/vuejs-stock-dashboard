<template>
  <div class="overview-bg-card">
    <BaseCard></BaseCard>
    <BaseCard></BaseCard>
    <BaseCard></BaseCard>
    <BaseCard></BaseCard>
    <BaseCard></BaseCard>
    <BaseCard></BaseCard>
  </div>
</template>

<script setup>

import BaseCard from './BaseCard.vue';

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
