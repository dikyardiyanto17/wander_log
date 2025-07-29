<script setup lang="ts">
// Typescript
import type { Article, ArticleUser } from "@/plugins/types";

// Vue
import { useRouter } from "vue-router";

// Variable
defineProps<{
  articles: Article[];
  user: ArticleUser;
  comment: number;
}>();
const router = useRouter();

// Function
const goToDetail = (event: Event, id: string | number) => {
  event.preventDefault();
  event.stopPropagation();
  router.push(`/travels/${id}`);
};
</script>

<template>
  <div class="card-container" @click="(e) => goToDetail(e, user.id)">
    <a class="series-title-container" href="#">
      <font-awesome-icon icon="user" class="fa-xs" />
      <span>{{ user.username }}</span>
    </a>

    <div class="series-card" style="cursor: pointer">
      <div class="series-title">
        <font-awesome-icon icon="book" class="fa-xs" />
        <span style="margin-left: 2px">{{ articles.length }} Travel Log</span>
      </div>

      <div class="series-info">
        <br />
        <span>
          <font-awesome-icon icon="comment" class="fa-xs" />
          {{ comment || 0 }} Total Comments
        </span>
        <br />
      </div>

      <div class="series-description">
        <span>
          <font-awesome-icon icon="note-sticky" />
          {{ user.email }}
        </span>
      </div>
    </div>
  </div>
</template>
