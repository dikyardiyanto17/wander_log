<script setup lang="ts">
// Typescript types
import type { Article } from "@/plugins/types";

// Vue
import { useRouter } from "vue-router";
import { computed, defineProps } from "vue";

// Variable
const props = defineProps<{
  article: Article;
}>();
const router = useRouter();
const emit = defineEmits(["clickcomment"]);

// Computed
const shortDescription = computed(() => {
  const desc = props.article?.description || "";
  const sanitized = stripImgTags(desc);
  return sanitized.length > 50 ? desc.slice(0, 50) + "..." : desc;
});

const stripImgTags = (html: string) => {
  return html.replace(/<img[^>]*>/gi, "");
};


// Function
const goToDetail = (event: Event) => {
  event.preventDefault();
  event.stopPropagation();
  router.push(`/travels/detail/${props.article.documentId}`);
};
// temp solution
const goToUser = (event: Event, id: number | string) => {
  event.stopPropagation();
  window.location.href = `/travelslist/${id}`;
};
</script>
<template>
  <div class="travel-card" @click="goToDetail">
    <div class="travel-header">
      <p style="font-weight: bold; cursor: pointer" @click="(e) => goToUser(e, article?.user?.id)">
        <font-awesome-icon icon="user" class="fa-xs" />
        {{ article?.user?.username }}
      </p>
      <p v-if="article?.publishedAt">
        {{
          new Date(article.publishedAt).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        }}
      </p>
    </div>
    <div class="travel-content">
      <div class="travel-picture">
        <img :src="article?.cover_image_url" alt="" />
      </div>
      <div class="travel-description">
        <p style="font-weight: bold">{{ article?.title }}</p>
        <div v-html="shortDescription"></div>
      </div>
    </div>
    <div class="travel-footer">
      <button class="share-btn" title="Comment" @click.stop="emit('clickcomment', article)">
        <font-awesome-icon icon="comment" class="fa-xs" />
        {{ article?.comments.length }} Comments
      </button>
    </div>
  </div>
</template>
