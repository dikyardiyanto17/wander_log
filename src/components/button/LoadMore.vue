<script setup lang="ts">
// Variable
const emit = defineEmits(["load-more"]);

// function
const handleClick = () => {
  emit("load-more");
};
</script>

<template>
  <div class="card-container" style="display: flex; justify-content: center; align-items: center">
    <button class="btn" @click="handleClick">Load More</button>
  </div>
</template>
