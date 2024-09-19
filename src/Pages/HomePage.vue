<template>
  <div class="main-container">
    <h1 class="font-bold text-lg mx-auto md:mx-0">Sign Payslip</h1>
  </div>
  <FileUploadOrganism class="mx-auto my-auto" />
  <ImageUploadOrganism class="mx-auto my-auto" />
</template>

<script setup lang="ts">
import ImageUploadOrganism from '../components/Organisms/ImageUploadOrganism.vue';
import FileUploadOrganism from '../components/Organisms/FileUploadOrganism.vue';
</script>