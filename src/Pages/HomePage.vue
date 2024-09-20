<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <TitleMolecule />
    <div class="flex flex-col md:flex-row w-full md:w-[60%] items-center space-y-5 md:space-y-4 md:space-x-5">
      <FileUploadOrganism class="w-full flex-2" />
      <ImageUploadOrganism class="w-full flex-1" />
    </div>
    <div>
      <input @click="pdfSignStore.SignPdf"
        class="font-bold text-white bg-blue-700 rounded-md py-2 px-5 cursor-pointer active:bg-blue-400" type="button"
        value="Sign My PDF" />
      <iframe v-if="pdfSignStore.signedPdf" :src="pdfSignStore.signedPdf.toString()" width="600" height="500"
        frameborder="0"></iframe>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ImageUploadOrganism from '../components/Organisms/ImageUploadOrganism.vue';
import FileUploadOrganism from '../components/Organisms/FileUploadOrganism.vue';
import TitleMolecule from '../components/Molecules/TitleMolecule.vue';
import { usePdfSignStore } from '../stores/pdf_sign';

const pdfSignStore = usePdfSignStore();
</script>
