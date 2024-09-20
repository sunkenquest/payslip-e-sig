<template>
  <div class="main-container flex flex-col justify-center items-center space-y-5">
    <BaseTextMolecule title="Upload File" />
    <FileInputMolecule @change="handleFileChange" />
    <div v-if="fileUrl" class="mt-4 w-full h-96 border border-gray-300 rounded-lg">
      <iframe :src="fileUrl" class="w-full h-full" frameborder="0" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { usePdfSignStore } from '../../stores/pdf_sign';
import FileInputMolecule from '../Molecules/FileInputMolecule.vue';
import BaseTextMolecule from '../Molecules/BaseTextMolecule.vue';

const pdfSignStore = usePdfSignStore();
const fileUrl = ref<string | null>(null);

const handleFileChange = (file: File) => {
  if (file.type === 'application/pdf') {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        fileUrl.value = e.target.result as string;
      }
    };
    pdfSignStore.uploadPdf(file);
    reader.readAsDataURL(file);
  } else {
    console.error('Invalid file type. Only PDFs are allowed.');
  }
};
</script>
