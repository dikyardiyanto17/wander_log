<script setup lang="ts">
// Assets
import "@/myassets/css/travellogs.css";
import "@/myassets/css/button.css";
import "@/myassets/css/input.css";
import "@/myassets/css/skeleton.css";

// Vue
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// Api
import ArticlesService from "@/api/articles";

// Stores
import { useArticlesStore } from "@/stores/articles";
import { useAuthStore } from "@/stores/auth";
import { useInfoStore } from "@/stores/info";
const articlesStore = useArticlesStore();
const infoStore = useInfoStore();
const authStore = useAuthStore();

// Typescript types
import type {
  ArticleDetailRequest,
  ArticleDetailResponse,
  ArticlesDeleteRequest,
} from "@/plugins/types";

// Component
import CommentCard from "@/components/cards/CommentCard.vue";
import DeletePopUp from "@/components/modal/DeletePopUp.vue";
import CommentBox from "@/components/box/CommentBox.vue";

// Variable
const route = useRoute();
const router = useRouter();
const params: any = route.params;
const showDeleteModal = ref(false);
const isLoading = ref(true);
const articleLink = `${window.location.origin}/articles/detail/${route.params.id}`;

// Function
const goToUser = (event: Event, id: number | string) => {
  event.stopPropagation();
  router.replace(`/travelslist/${id}`);
};

const openDeleteModal = () => {
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
};

const confirmDelete = async () => {
  try {
    await infoStore.startLoading();

    if (!articlesStore?.article?.documentId) {
      throw { name: "frontend_error", message: "ID is not detected" };
    }

    const payload: ArticlesDeleteRequest = {
      token: authStore.jwt,
      documentId: articlesStore.article.documentId,
    };

    await ArticlesService.delete(payload);
    infoStore.showInfo({ messages: "Your travel log deleted successfully", type: "success" });
    router.push(`/travelslist/${authStore.id}`);
  } catch (error: any) {
    await infoStore.errorHandling(error);
  } finally {
    showDeleteModal.value = false;
    await infoStore.resetLoading();
  }
};

const shareTo = (platform: string) => {
  const encodedURL = encodeURIComponent(articleLink);
  const encodedTitle = encodeURIComponent(articlesStore?.article?.title || "Check this out!");

  let url = "";

  switch (platform) {
    case "facebook":
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`;
      break;
    case "twitter":
      url = `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`;
      break;
    case "whatsapp":
      url = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedURL}`;
      break;
  }

  if (url) window.open(url, "_blank");
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(articleLink);
    alert("Link copied to clipboard!");
  } catch (err) {
    alert("Failed to copy the link.");
  }
};

// Lifecycles
onMounted(async () => {
  try {
    await infoStore.startLoading();
    isLoading.value = true;

    const payload: ArticleDetailRequest = {
      token: authStore.jwt,
      documentId: params.id,
      populate: "*",
    };

    const response: ArticleDetailResponse = await ArticlesService.detail(payload);
    await articlesStore.setArticle(response.data);
  } catch (error: any) {
    await infoStore.errorHandling(error);
  } finally {
    isLoading.value = false;
    await infoStore.resetLoading();
  }
});
</script>
<template>
  <div class="custom-container">
    <DeletePopUp
      message="Are you sure to delete your wonderful journey post ?"
      :show-delete-modal="showDeleteModal"
      v-on:confirm="confirmDelete"
      v-on:cancel="cancelDelete"
    />
    <div class="comment-wrapper">
      <label class="toggle-label">
        <input type="checkbox" id="comment-toogle" />
        Show Comment
      </label>
    </div>
    <section class="travel-container" v-if="!isLoading">
      <div class="detail-button-container" v-if="articlesStore?.article?.user?.id === authStore.id">
        <router-link :to="`/update/travels/${articlesStore.article.documentId}`">
          <button class="btn">Edit</button>
        </router-link>
        <button class="btn btn-danger" @click="openDeleteModal">Delete Post</button>
      </div>

      <div class="header-travel" style="margin-top: 20px">
        <div
          style="display: flex; justify-content: center; align-items: center; gap: 10px"
          @click="
            (e) => {
              const id = articlesStore.article?.user?.id;
              if (id !== undefined) goToUser(e, id);
            }
          "
        >
          <div class="avatar" style="cursor: pointer">
            <span>
              {{
                articlesStore?.article?.user?.username
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0]?.toUpperCase())
                  .join("") || ""
              }}</span
            >
          </div>
          <p style="font-size: 20px; font-weight: bold; cursor: pointer">
            {{ articlesStore?.article?.user?.username }}
          </p>
        </div>
        <p v-if="articlesStore?.article?.publishedAt" class="custom-date">
          {{
            new Date(articlesStore.article.publishedAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          }}
        </p>
      </div>
      <div class="travel-content-detail">
        <img :src="articlesStore?.article?.cover_image_url" alt="images" />
        <div v-html="articlesStore?.article?.description"></div>
      </div>
      <div class="share-buttons">
        <button class="btn" @click="shareTo('facebook')">
          <font-awesome-icon icon="fa-brands fa-facebook-f" /> Facebook
        </button>
        <button class="btn" @click="shareTo('twitter')">
          <font-awesome-icon icon="fa-brands fa-twitter" /> Twitter
        </button>
        <button class="btn" @click="shareTo('whatsapp')">
          <font-awesome-icon icon="fa-brands fa-whatsapp" /> WhatsApp
        </button>
        <button class="btn" @click="copyLink">
          <font-awesome-icon icon="fa fa-link" /> Copy Link
        </button>
      </div>
    </section>
    <section v-else class="travel-container">
      <div class="skeleton-avatar shimmer"></div>
      <div class="skeleton-title shimmer"></div>
      <div class="skeleton-image shimmer"></div>
      <div class="skeleton-text shimmer"></div>
    </section>

    <section class="comment-container" id="comment-container">
      <CommentBox v-if="articlesStore?.article != undefined" :article="articlesStore?.article" />
      <CommentCard
        v-for="comment in articlesStore?.article?.comments"
        :comment="comment"
        :is-loading="isLoading"
      />
    </section>
  </div>
</template>
<style scoped></style>
