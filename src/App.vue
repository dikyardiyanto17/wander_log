<script setup lang="ts">
import { onBeforeMount } from "vue";
import Header from "./components/layout/Header.vue";
import { useThemeStore } from "./stores/theme.ts";
import Info from "./components/layout/Info.vue";

// Init theme
const themeStore = useThemeStore();
onBeforeMount(() => {
  themeStore.initTheme();
});
</script>

<template>
  <div
    :class="[
      'background-container',
      themeStore.isDark ? 'dark-mode' : 'light-mode',
      themeStore.isDark
        ? `dark-background-${themeStore.darkBackground}`
        : `light-background-${themeStore.lightBackground}`,
    ]"
    id="background-container-id"
  >
    <Info />
    <Header />
    <RouterView />
  </div>
</template>

<style scoped></style>
