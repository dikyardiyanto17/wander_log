<script setup lang="ts">
// Typescript types
import type { Article } from "@/plugins/types";

// Vue
import { useRouter } from "vue-router";
import { defineProps } from "vue";

// Variables
const props = defineProps<{
  article: Article;
}>();

const router = useRouter();

const goToDetail = (event: Event, id: string | number) => {
  event.preventDefault();
  event.stopPropagation();
  router.push(`/travels/detail/${id}`);
};
</script>

<template>
  <div class="card-container" @click="(e) => goToDetail(e, article?.documentId)">
    <a class="series-title-container" href="#">
      <font-awesome-icon icon="book" class="fa-xs" />
      <span>{{ article?.title }}</span>
    </a>

    <div
      class="series-card"
      style="cursor: pointer"
      :style="{ backgroundImage: `url(${article?.cover_image_url})` }"
    >
      <div class="series-title">
        <span style="margin-left: 2px">{{
          article?.description?.slice(0, 40) + (article?.description?.length > 40 ? "..." : "")
        }}</span>
      </div>

      <div class="series-info">
        <br />
        <span>
          <font-awesome-icon icon="comment" class="fa-xs" />
          {{ article?.comments?.length || 0 }} Total Comments
        </span>
        <br />
      </div>

      <div class="series-description">
        <span>
          <font-awesome-icon icon="note-sticky" />
          {{ article?.user?.username }}
        </span>
      </div>
    </div>
  </div>
</template>
