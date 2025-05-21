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
    border-radius: 20px;
    padding: 24px;
    background-color: #023A6233;

  }
  </style>