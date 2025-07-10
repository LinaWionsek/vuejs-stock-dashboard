<template>
  <BaseCard class="revenue-breakdowncard-size">
    <h2 class="text-xl font-bold">Revenue Breakdown Magnificent Seven</h2>
  </BaseCard>
</template>

<script>
import BaseCard from "./BaseCard.vue";

export default {
  name: "RevenueBreakdown",
  components: { BaseCard },
};
</script>

<style scoped>
.revenue-breakdowncard-size {
  height: 352px;
  width: 494px;
}
</style>
