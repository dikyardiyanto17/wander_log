<script setup lang="ts">
import { computed } from "vue";
import { useInfoStore } from "@/stores/info";

const infoStore = useInfoStore();

const infoClass = computed(() => [
  "info-container",
  "flicker",
  infoStore.isShown ? "show" : "",
  infoStore.type,
]);
</script>

<template>
  <div :class="infoClass" id="info-container" style="z-index: 100">
    <i id="info-icon" class="fa-solid fa-check fa-beat-fade" style="color: #63e6be"></i>
    <span id="info-message">{{ infoStore.messages }}</span>
  </div>
  <div v-if="infoStore.isLoading" class="loading-overlay">
    <div class="spinner"></div>
    <div class="loading-text">Loading...</div>
  </div>
</template>

<style scoped>
.dark-mode .info-container {
  position: fixed;
  padding: 5px 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #0000006f;
  border-radius: 5px;
  backdrop-filter: blur(3px);
  border: 1px solid #1f1f1f;
  box-shadow: 0 -2px 12px rgb(255, 255, 255);
  z-index: 6;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
  display: none;
  transition: 1s;
}

.light-mode .info-container {
  position: fixed;
  padding: 5px 15px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff6f;
  border-radius: 5px;
  backdrop-filter: blur(3px);
  border: 1px solid #cccccc;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.1);
  z-index: 4;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  transform-style: preserve-3d;
  display: none;
  transition: 1s;
}

.dark-mode .info-container.show {
  display: block;
  transition: 1s;
}

.light-mode .info-container.show {
  display: block;
  transition: 1s;
}

.dark-mode .danger {
  background-color: #ff4d4f !important;
  color: #fff !important;
  border: 1px solid #ffa39e !important;
}

.light-mode .danger {
  background-color: #ff0004 !important;
  border: 1px solid #ff7c75 !important;
}

.dark-mode .warning {
  background-color: #faad14 !important;
  color: #000 !important;
  border: 1px solid #ffe58f !important;
}

.light-mode .warning {
  background-color: #fdec2c !important;
  color: #614700 !important;
  border: 1px solid #ffe58f !important;
}

.dark-mode .success {
  background-color: #52c41a !important;
  color: #fff !important;
  border: 1px solid #b7eb8f !important;
}

.light-mode .success {
  background-color: #8bff51 !important;
  color: #237804 !important;
  border: 1px solid #b7eb8f !important;
}

.info-container.flicker {
  animation: flicker 3s infinite;
}

.light-mode .loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9999;
}

.light-mode .spinner {
  width: 60px;
  height: 60px;
  border: 8px solid #63e6be;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

.dark-mode .loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(37, 33, 33, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9999;
}

.dark-mode .spinner {
  width: 60px;
  height: 60px;
  border: 8px solid #63e6be;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
}

.loading-text {
  margin-top: 16px;
  font-size: 1.2rem;
  color: #444;
  font-weight: 600;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes flicker {
  0% {
    opacity: 1;
  }
  10% {
    opacity: 0.8;
  }
  20% {
    opacity: 1;
  }
  30% {
    opacity: 0.6;
  }
  40% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
  60% {
    opacity: 1;
  }
  70% {
    opacity: 0.7;
  }
  80% {
    opacity: 1;
  }
  90% {
    opacity: 0.85;
  }
  100% {
    opacity: 1;
  }
}
</style>
