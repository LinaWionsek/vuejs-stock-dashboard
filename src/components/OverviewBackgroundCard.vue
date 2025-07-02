<template>
    <div class="overview-bg-card">
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: "OverviewBackgroundCard",
  };
  </script>
  
  <style scoped>
  .overview-bg-card {
    height: 191px;
    width: 1223.6px;
    border-radius: 20px;
    padding: 24px;
    background-color: #023A6233;
    gap: 20px;

  }
  </style>