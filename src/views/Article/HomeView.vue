<script setup lang="ts">
// Assets
import "@/myassets/css/card.css";
import "@/myassets/css/button.css";
import "@/myassets/css/input.css";

// Vue
import { ref, onMounted, computed } from "vue";

// Api
import ArticlesService from "@/api/articles";

// Stores
import { useInfoStore } from "@/stores/info";
import { useArticlesStore } from "@/stores/articles";
import { useAuthStore } from "@/stores/auth";
const infoStore = useInfoStore();
const authStore = useAuthStore();
const articlesStore = useArticlesStore();

// Typescript types
import type { ArticlesRequest, ArticlesResponse } from "@/plugins/types";

// Components
import Card from "@/components/cards/UserCard.vue";
import LoadMore from "@/components/button/LoadMore.vue";

// Variables
const visibleUserCount = ref(6);
const searchTerm = ref("");

// Computed
const filteredUsers = computed(() =>
  articlesStore.users.filter(
    (user) =>
      user.user.username.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      user.user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);
const visibleUsers = computed(() => filteredUsers.value.slice(0, visibleUserCount.value));

// Function
const loadMoreUsers = (event: Event): void => {
  event.preventDefault();
  infoStore.startLoading();
  setTimeout(() => {
    visibleUserCount.value += 6;
    infoStore.resetLoading();
  }, 2000);
};

// Lifecycles
onMounted(async () => {
  try {
    await infoStore.startLoading();
    const payload: ArticlesRequest = {
      token: authStore.jwt,
      populate: "*",
      pagination: { page: 1, pageSize: 1000 },
    };
    const response: ArticlesResponse = await ArticlesService.articles(payload);
    const userArticle = await articlesStore.groupArticlesByUser(response.data);
    await articlesStore.setArticles(response.data);
    if (response.meta?.pagination) {
      await articlesStore.setPagination(response.meta.pagination);
    }
  } catch (error: any) {
    await infoStore.errorHandling(error);
  } finally {
    await infoStore.resetLoading();
  }
});
</script>

<template>
  <div class="custom-container">
    <section class="public-diaries">
      <div class="home-header">
        <h1>- Wonder Travels -</h1>
        <div class="search-box text-center mb-4">
          <input
            type="text"
            v-model="searchTerm"
            placeholder="Search by username or email..."
            class="custom-input"
            style="margin: 20px 0"
          />
        </div>
        <router-link to="/travels" class="btn"> Explore Travel Logs </router-link>
      </div>
      <div class="series-container">
        <Card
          v-for="user in visibleUsers"
          :key="user.user.id"
          :articles="user.articles"
          :user="user.user"
          :comment="user.comments"
        />

        <div v-if="visibleUserCount < filteredUsers.length" class="text-center mt-4">
          <LoadMore @click="loadMoreUsers" />
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped></style>
