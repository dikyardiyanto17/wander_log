<script setup lang="ts">
// Asset CSS
import "@/myassets/css/travellogs.css";
import "@/myassets/css/button.css";
import "@/myassets/css/input.css";
import "@/myassets/css/skeleton.css";

// Vue
import { ref, onMounted, computed, onUnmounted, type Ref } from "vue";
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
import type { Article, ArticlesRequest, ArticlesResponse } from "@/plugins/types";

// Component
import LoadMore from "@/components/button/LoadMore.vue";
import TravelListCard from "@/components/cards/ArticleCardList.vue";
import CommentCard from "@/components/cards/CommentCard.vue";
import CommentBox from "@/components/box/CommentBox.vue";

// Variable
const isLoadingMore = ref(false);
const visibleUserCount = ref(6);
const route = useRoute();
const rawId = route.params.id;
const userId: string | number | undefined = Array.isArray(rawId) ? rawId[0] : rawId;
const containerRef = ref<HTMLElement | null>(null);
const searchTerm = ref("");
const selectedArticle: Ref<Article | null> = ref(null);
const isLoading = ref(true);

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
  if (isLoadingMore.value) return;
  isLoadingMore.value = true;
  setTimeout(() => {
    visibleUserCount.value += 6;
    isLoadingMore.value = false;
  }, 2000);
};

const selectArticle = (article: Article): void => {
  selectedArticle.value = article;
};

const handleContainerScroll = (event: Event): void => {
  event.preventDefault();
  const el = containerRef.value;
  if (!el) return;

  const scrollTop = el.scrollTop;
  const scrollHeight = el.scrollHeight;
  const clientHeight = el.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight - 100) {
    if (visibleUserCount.value < filteredUsers.value.length) {
      loadMoreUsers(event);
    }
  }
};

// Lifecycle
onMounted(async () => {
  try {
    const el = document.getElementById("travel-container-id");
    if (el) {
      containerRef.value = el;
      el.addEventListener("scroll", handleContainerScroll);
    }
    isLoading.value = true;
    await infoStore.startLoading();

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
    isLoading.value = false;
    await infoStore.resetLoading();
  }
});

onUnmounted(() => {
  containerRef.value?.removeEventListener("scroll", handleContainerScroll);
});
</script>
<template>
  <div class="custom-container">
    <div class="comment-wrapper">
      <label class="toggle-label">
        <input type="checkbox" id="comment-toogle" />
        Show Comment
      </label>
    </div>

    <section class="travel-container" id="travel-container-id">
      <template v-if="isLoading">
        <div v-for="n in 3" :key="n" class="travel-card skeleton shimmer"></div>
      </template>

      <template v-else>
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

        <router-link
          v-if="userId == authStore.id"
          to="/create/travels"
          class="btn"
          style="margin: 20px 0; width: 100%; display: flex; justify-content: center"
        >
          Write your journey.
        </router-link>

        <TravelListCard
          v-for="article in visibleArticles"
          :key="article.id"
          :article="article"
          @clickcomment="selectArticle"
        />

        <div
          v-if="visibleUserCount < filteredUsers.length"
          class="travel-card"
          style="display: flex; justify-content: center; align-items: center"
        >
          <LoadMore v-if="!isLoadingMore" @click="loadMoreUsers" />
          <div v-else class="travel-card skeleton shimmer" style="height: 150px; width: 100%"></div>
        </div>
      </template>
    </section>

    <section class="comment-container" id="comment-container">
      <CommentBox v-if="selectedArticle" :article="selectedArticle" />
      <p style="font-weight: bold; text-align: center; margin: 20px 0">
        {{ selectedArticle?.title || "Please select an commented article first" }}
      </p>
      <CommentCard
        v-for="comment in selectedArticle?.comments"
        :comment="comment"
        :is-loading="isLoading"
      />
    </section>
  </div>
</template>
