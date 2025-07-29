<script setup lang="ts">

// Vue
import type { ArticleComment } from "@/plugins/types";
import { ref } from "vue";

// Variable
defineProps<{
  comment: ArticleComment;
  isLoading: boolean;
}>();

const commentInput = ref("");

// Function
const formatCommentDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr > 1 ? "s" : ""} ago`;
  if (diffDay === 1) return "yesterday";

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "2-digit",
  });
};

const handlePostComment = async () => {
  if (!commentInput.value.trim()) return;

  commentInput.value = "";
};
</script>
<template>
  <div class="comment-box">
    <div class="comment-content">
      <div class="comment-header">
        <span class="timestamp" v-if="!isLoading">{{ formatCommentDate(comment.createdAt) }}</span>
        <div
          class="timestamp shimmer"
          v-else
          style="width: 100px; height: 14px; border-radius: 5px"
        ></div>

        <form v-if="!isLoading">
          <button type="submit" class="delete-btn">
            <i class="fa fa-trash"></i>
          </button>
        </form>
        <div v-else class="shimmer" style="width: 20px; height: 20px; border-radius: 4px"></div>
      </div>

      <p v-if="!isLoading">{{ comment.content }}</p>
      <div v-else class="shimmer" style="width: 100%; height: 40px; border-radius: 6px"></div>
    </div>
  </div>
</template>
