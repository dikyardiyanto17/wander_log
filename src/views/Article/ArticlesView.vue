<script setup lang="ts">
// Assets
import "@/myassets/css/card.css";
import "@/myassets/css/button.css";
import "@/myassets/css/input.css";

// Vue
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

// API
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

// Component
import LoadMore from "@/components/button/LoadMore.vue";
import ArticleCard from "@/components/cards/ArticleCard.vue";

// Variables
const visibleUserCount = ref(6);
const searchTerm = ref("");
const route = useRoute();
const rawId = route.params.id;
const userId: string | number | undefined = Array.isArray(rawId) ? rawId[0] : rawId;

// Computed
const filteredUsers = computed(() =>
  articlesStore.articles.filter(
    (article) =>
      article?.title?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      article?.user?.username?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      article?.description?.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      article?.category?.description.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
);
const visibleArticles = computed(() => filteredUsers.value.slice(0, visibleUserCount.value));

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
    if (userId && articlesStore.articles.length > 0) {
      await articlesStore.resetArticles();
    }
    const payload: ArticlesRequest = {
      token: authStore.jwt,
      populate: "*",
      pagination: { page: 1, pageSize: 1000 },
      ...(userId && {
        filters: {
          option: "[user][id]",
          value: userId,
        },
      }),
    };
    const response: ArticlesResponse = await ArticlesService.articles(payload);
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
            placeholder="Search by User or Travel Logs title..."
            class="custom-input"
            style="margin: 20px 0"
          />
        </div>

        <router-link to="/" class="btn" style="margin: 0 10px"> Meet the Travellers </router-link>
        <router-link to="/travelslist" class="btn" style="margin: 0 10px">
          Travel Logs List
        </router-link>
        <router-link
          v-if="userId == authStore.id"
          to="/create/travels"
          class="btn"
          style="margin: 0 10px"
        >
          Write your journey.
        </router-link>
      </div>
      <div class="series-container">
        <p
          v-if="visibleArticles.length < 1 && userId"
          style="text-align: center; font-weight: bold; font-size: 20px"
        >
          {{
            userId == authStore.id
              ? "You haven't started your travel journey"
              : "This user hasn't started their travel journey"
          }}
          yet.
        </p>
        <ArticleCard v-for="article in visibleArticles" :key="article.id" :article="article" />

        <div v-if="visibleUserCount < filteredUsers.length" class="text-center mt-4">
          <LoadMore @click="loadMoreUsers" />
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped></style>
