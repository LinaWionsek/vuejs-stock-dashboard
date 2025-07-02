<template>
    <div>
     <BaseCard class="revenue-history-card-size"> 
        <slot></slot>
      </BaseCard>
    </div>
  </template>
  
  <script>

import BaseCard from './BaseCard.vue';

  export default {
    name: "RevenueHistory",
    components: {
     BaseCard
    }
  };

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