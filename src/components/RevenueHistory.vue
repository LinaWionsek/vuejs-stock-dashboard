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
    width: 300px;
  }

 
  </style>