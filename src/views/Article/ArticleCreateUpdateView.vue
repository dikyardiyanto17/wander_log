<script setup lang="ts">
// Assets
import "@/myassets/css/travellogs.css";
import "@/myassets/css/button.css";
import "@/myassets/css/input.css";

// Vue
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";

// API
import ArticlesService from "@/api/articles";

// Stores
import { useAuthStore } from "@/stores/auth";
import { useInfoStore } from "@/stores/info";
const authStore = useAuthStore();
const infoStore = useInfoStore();

// Typescript types
import type {
  ArticleDetailRequest,
  ArticleDetailResponse,
  ArticleForm,
  ArticlesPostRequest,
  ArticlesPostResponse,
  ArticlesPutRequest,
  ImageUploadRequest,
  ImageUploadResponse,
} from "@/plugins/types";
import { useRoute, useRouter } from "vue-router";

// Variables
const form = reactive<ArticleForm>({
  title: "",
  coverImageFile: null,
  description: "",
});
const showPreview = ref(false);
let coverImagePreviewUrl = ref<string | undefined>(undefined);
const router = useRouter();
const route = useRoute();
const articleId: any = route.params.id;

// Computed
const isUpdateMode = computed(() => route.name === "travels-update");
const isCreateMode = computed(() => route.name === "travels-create");

// Function
const handleFileChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    form.coverImageFile = file;
    coverImagePreviewUrl.value = URL.createObjectURL(file);
  }
};
const togglePreview = (): void => {
  showPreview.value = !showPreview.value;
};
const handleSubmit = async (event: Event): Promise<void> => {
  event.preventDefault();
  if (isCreateMode.value) {
    await handleCreateSubmit();
  } else {
    await handleUpdateSubmit();
  }
};

const uploadImage = async (): Promise<string> => {
  try {
    if (typeof form.coverImageFile === "string") {
      return form.coverImageFile;
    }

    if (!(form.coverImageFile instanceof File)) {
      return "";
    }

    const uploadFormData = new FormData();
    uploadFormData.append("files", form.coverImageFile);

    const imageUploadPayload: ImageUploadRequest = {
      token: authStore.jwt,
      uploadFormData,
    };

    const imageUploadResponse: ImageUploadResponse = await ArticlesService.uploadPicture(
      imageUploadPayload
    );

    return imageUploadResponse[0]?.url || "";
  } catch (error: any) {
    throw error;
  }
};

const handleCreateSubmit = async (): Promise<void> => {
  try {
    if (!form.title || !form.coverImageFile || !form.description) {
      throw { name: "frontend_error", message: "Please complete the form!" };
    }
    await infoStore.startLoading();
    if (form.coverImageFile) {
      const imageUrl: string = await uploadImage();
      if (imageUrl) {
        const payload: ArticlesPostRequest = {
          title: form.title,
          description: form.description,
          cover_image_url: imageUrl,
          token: authStore.jwt,
        };

        const articlesPostResponse: ArticlesPostResponse = await ArticlesService.create(payload);
        if (articlesPostResponse) {
          infoStore.showInfo({ messages: "Successfully created Travel", type: "success" });
          router.push(`/travelslist/${authStore.id}`);
        }
      }
    }
  } catch (error: any) {
    await infoStore.errorHandling(error);
  } finally {
    await infoStore.resetLoading();
  }
};

const handleUpdateSubmit = async (): Promise<void> => {
  try {
    await infoStore.startLoading();

    if (form.coverImageFile instanceof File) {
      form.coverImageFile = await uploadImage();
    }
    const payload: ArticlesPutRequest = {
      title: form.title,
      description: form.description,
      cover_image_url: form.coverImageFile,
      token: authStore.jwt,
      documentId: articleId,
    };

    const response: ArticlesPostResponse = await ArticlesService.update(payload);
    console.log(response);
    if (response) {
      infoStore.showInfo({ messages: "Successfully created Travel", type: "success" });
      router.push(`/travels/detail/${articleId}`);
    }
  } catch (error: any) {
    await infoStore.errorHandling(error);
  } finally {
    await infoStore.resetLoading();
  }
};

const handleUpdateData = async (): Promise<void> => {
  try {
    await infoStore.startLoading();
    const payload: ArticleDetailRequest = {
      token: authStore.jwt,
      documentId: articleId,
    };
    const response: ArticleDetailResponse = await ArticlesService.detail(payload);
    const { cover_image_url, title, description } = response.data;
    form.coverImageFile = cover_image_url;
    form.description = description;
    form.title = title;
    coverImagePreviewUrl.value = cover_image_url;
    const $ = (window as any).$;
    $("#summernote").summernote("code", form.description);
  } catch (error: any) {
    await infoStore.errorHandling(error);
  } finally {
    await infoStore.resetLoading();
  }
};

// Lifecycles
onMounted(() => {
  const $ = (window as any).$;
  $("#summernote").summernote({
    height: 300,
    placeholder: "Write your travel log...",
    callbacks: {
      onChange: (contents: string) => {
        form.description = contents;
      },
    },
  });

  $("#preview-button").on("click", () => {
    const content = $("#summernote").summernote("code");
    $("#preview-content").html(content);
    $("#preview-container").show();
  });
  if (isUpdateMode.value) {
    handleUpdateData();
  }
});

onBeforeUnmount(() => {
  if (coverImagePreviewUrl.value) {
    URL.revokeObjectURL(coverImagePreviewUrl.value);
  }
});
</script>

<template>
  <form class="container-create" @submit="handleSubmit">
    <section @click.stop="togglePreview" class="preview-container" v-if="showPreview">
      <div class="preview-content">
        <h2>{{ form.title }}</h2>
        <img v-if="coverImagePreviewUrl" :src="coverImagePreviewUrl" alt="Cover Image" />
        <div v-html="form.description"></div>
      </div>
    </section>

    <div class="button-container">
      <button type="submit" class="btn">{{ isCreateMode ? "Create" : "Update" }}</button>
      <button type="button" class="btn" id="preview-button" @click="togglePreview">Preview</button>
    </div>

    <div class="input-container">
      <input
        type="text"
        name="title"
        v-model="form.title"
        placeholder="Title..."
        class="custom-input"
        style="width: 300px"
      />
      <input
        class="btn"
        accept=".jpg,.jpeg,.png"
        type="file"
        name="articles-images"
        @change="handleFileChange"
      />
    </div>

    <div id="summernote"></div>
  </form>
</template>
