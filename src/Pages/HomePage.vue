<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <TitleMolecule />
    <div class="flex flex-col md:flex-row w-full md:w-[60%] items-center space-y-5 md:space-y-4 md:gap-5">
      <FileUploadOrganism class="w-full flex-2" />
      <ImageUploadOrganism class="w-full flex-1" />
    </div>
    <div class="w-[60%] mt-5">
      <input @click="pdfSignStore.SignPdf"
        class="w-[100%] font-bold text-white bg-blue-700 rounded-md py-2 px-5 cursor-pointer active:bg-blue-400"
        type="button" value="Sign My PDF" />
      <iframe class="mt-5" v-if="pdfSignStore.signedPdf" :src="pdfSignStore.signedPdf.toString()" width="100%"
        height="500" frameborder="0"></iframe>
    </div>

    <div v-if="pdfSignStore.status === EventStatus.failed">
      <h1 class="font-bold text-red-900">{{ pdfSignStore.error }}</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ImageUploadOrganism from '../components/Organisms/ImageUploadOrganism.vue';
import FileUploadOrganism from '../components/Organisms/FileUploadOrganism.vue';
import TitleMolecule from '../components/Molecules/TitleMolecule.vue';
import { usePdfSignStore } from '../stores/pdf_sign';
import { EventStatus } from '../types/enums/status';

const pdfSignStore = usePdfSignStore();
</script>
