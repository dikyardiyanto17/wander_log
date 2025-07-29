<script setup lang="ts">
defineProps<{
  showDeleteModal: boolean;
  message: string;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

const handleConfirm = () => emit("confirm");
const handleCancel = () => emit("cancel");
</script>

<template>
  <div v-if="showDeleteModal" class="modal-overlay">
    <div class="modal-content light-mode dark:dark-mode">
      <h3>{{ message }}</h3>
      <div class="modal-actions">
        <button class="btn btn-danger" @click="handleConfirm">Yes, Delete</button>
        <button class="btn" @click="handleCancel">Cancel</button>
      </div>
    </div>
  </div>
</template>
