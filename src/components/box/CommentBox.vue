<script lang="ts" setup>
// Vue
import { ref } from "vue";

// Stores
import { useAuthStore } from "@/stores/auth";
import { useArticlesStore } from "@/stores/articles";
const authStore = useAuthStore();
const articlesStore = useArticlesStore();

// API
import CommentsService from "@/api/comments";

// Typescript type
import type { Article } from "@/plugins/types";

// import type { ArticlesCommentRequest, ArticlesCommentResponse } from "@/plugins/types";

// Variable
const props = defineProps<{
  article: Article;
}>();
const commentContent = ref("");
const isSubmitting = ref(false);

// Function
const handleSubmit = async () => {
  if (!commentContent.value.trim()) return;
  isSubmitting.value = true;

  try {
    const payload = {
      token: authStore.jwt,
      content: commentContent.value,
      article: props.article.id,
    };
    const response = await CommentsService.create(payload);
    articlesStore.addCommentArticle({ ...response.data }, props.article.id);
    commentContent.value = "";
  } catch (err) {
    console.error("Failed to post comment", err);
  } finally {
    isSubmitting.value = false;
  }
};

const handleKeyDown = async (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    await handleSubmit();
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="comment-content">
      <textarea
        name="comment"
        placeholder="Write a comment..."
        class="comment-input"
        v-model="commentContent"
        :disabled="isSubmitting"
        @keydown="handleKeyDown"
      ></textarea>

      <button type="submit" class="btn" :disabled="isSubmitting || !commentContent.trim()">
        {{ isSubmitting ? "Submitting..." : "Comment" }}
      </button>
    </div>
  </form>
</template>
