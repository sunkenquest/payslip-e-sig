<template>
  <div class="main-container flex flex-col justify-center items-center space-y-5">
    <BaseTextMolecule class="text-left w-full" title="Upload File" />
    <FileInputMolecule :key="fileKey" @change="handleFileChange" />
    <div v-if="file"
      class="mt-4 w-full border border-gray-300 border-solid rounded-lg bg-white p-4 flex items-center justify-between h-20">
      <div class="flex flex-col">
        <span class="font-semibold text-xs">{{ file.name }}</span>
        <span class="text-xs">{{ fileSize }}</span>
      </div>
      <div class="">
        <ButtonAtom label="Delete" color="red" @click="removeFile" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePdfSignStore } from '../../stores/pdf_sign';
import { ref, computed } from 'vue';
import FileInputMolecule from '../Molecules/FileInputMolecule.vue';
import BaseTextMolecule from '../Molecules/BaseTextMolecule.vue';
import ButtonAtom from '../Atoms/ButtonAtom.vue';

const pdfSignStore = usePdfSignStore();
const file = ref<File | null>(null);
const fileUrl = ref<string | null>(null);
const fileKey = ref<number>(0);

const handleFileChange = (selectedFile: File) => {
  if (selectedFile.type === 'application/pdf') {
    file.value = selectedFile;
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        fileUrl.value = e.target.result as string;
      }
    };
    reader.readAsDataURL(selectedFile);
    pdfSignStore.uploadPdf(selectedFile);
  } else {
    console.error('Invalid file type. Only PDFs are allowed.');
  }
};

const fileSize = computed(() => {
  if (file.value) {
    return `${(file.value.size / 1024).toFixed(2)} KB`;
  }
  return '';
});

const removeFile = () => {
  file.value = null;
  fileUrl.value = null;
  fileKey.value += 1;
};
</script>
