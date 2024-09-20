<template>
  <div class="main-container flex flex-col justify-center items-center space-y-3">
    <BaseTextMolecule class="text-left w-full" title="Upload Signature(.png)" />
    <ImageInputMolecule :key="fileKey" @change="handleImageChange" />
    <a href="https://www.remove.bg" class="text-xs text-blue-500 hover:underline">image background
      remover</a>
    <div v-if="image"
      class="mt-4 w-full border border-gray-300 border-solid rounded-lg bg-white p-4 flex items-center justify-between h-20">
      <div class="flex flex-col">
        <span class="font-semibold text-xs">{{ image.name }}</span>
        <span class="text-xs">{{ fileSize }}</span>
      </div>
      <div class="flex space-x-2">
        <ButtonAtom label="Delete" color="red" @click="removeFile" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSignatureStore } from '../../stores/signature';
import { computed, onMounted, ref } from 'vue';
import BaseTextMolecule from '../Molecules/BaseTextMolecule.vue';
import ImageInputMolecule from '../Molecules/ImageInputMolecule.vue';

const signatureStore = useSignatureStore();

// const handleFileUpload = async (event: Event) => {
//   const target = event.target as HTMLInputElement;
//   if (target.files && target.files[0]) {
//     const file = target.files[0];
//     try {
//       await signatureStore.uploadSignature(file);
//     } catch (error) {
//       console.error('Error uploading signature:', error)
//     }
//   }
// };
import ButtonAtom from '../Atoms/ButtonAtom.vue';

const image = ref<File | null>(null);
const imageUrl = ref<string | null>(null);
const fileKey = ref<number>(0);

const handleImageChange = (file: File) => {
  if (file.type.startsWith('image/')) {
    image.value = file;
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        imageUrl.value = e.target.result as string;
      }
    };
    signatureStore.uploadSignature(file);
    reader.readAsDataURL(file);
  } else {
    console.error('Invalid file type. Only images are allowed.');
  }
};

const fileSize = computed(() => {
  if (image.value) {
    return `${(image.value.size / 1024).toFixed(2)} KB`;
  }
  return '';
});

const removeFile = () => {
  signatureStore.removeSavedSignature();
  image.value = null;
  imageUrl.value = null;
  fileKey.value += 1;
};

onMounted(() => {
  const strImage = localStorage.getItem('signature');
  if (strImage !== null) {
    signatureStore.convertBase64ToFile(strImage, 'saved-signature.png');
    image.value = signatureStore.convImg;
  }
});
</script>
