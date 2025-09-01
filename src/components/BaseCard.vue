<template>
  <div class="base-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseCard",
};
</script>

<style scoped>
.base-card {
  display: flex;
  flex-direction: column;
  background-color: #011f35;
  border-radius: 16px;
  padding: 20px 24px;
  gap: 8px;
  width: 173px;
  height: 143px; /*fix*/
  color: #ffffff; /* Standardmäßige Textfarbe für besseren Kontrast */
}
</style>
