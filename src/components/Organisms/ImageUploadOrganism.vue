<template>
  <div class="main-container flex flex-col justify-center items-center space-y-5">
    <BaseTextMolecule title="Upload Image" />
    <ImageInputMolecule @change="handleImageChange" />
    <div v-if="imageUrl" class="mt-4 w-full h-96 border border-gray-300 rounded-lg">
      <img :src="imageUrl" alt="Uploaded Image" class="w-full h-full object-cover" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import BaseTextMolecule from '../Molecules/BaseTextMolecule.vue';
import ImageInputMolecule from '../Molecules/ImageInputMolecule.vue';

const imageUrl = ref<string | null>(null);

const handleImageChange = (file: File) => {
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        imageUrl.value = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  } else {
    console.error('Invalid file type. Only images are allowed.');
  }
};
</script>
