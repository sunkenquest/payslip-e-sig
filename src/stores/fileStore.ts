import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useFileStore = defineStore('fileStore', () => {
  const file = ref<File | null>(null);
  const image = ref<File | null>(null);

  const setFile = (selectedFile: File | null) => {
    file.value = selectedFile;
  };

  const setImage = (selectedImage: File | null) => {
    image.value = selectedImage;
  };

  const bothFilesSelected = computed(() => {
    return file.value !== null && image.value !== null;
  });

  return { file, image, setFile, setImage, bothFilesSelected };
});
