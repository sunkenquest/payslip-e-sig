<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <TitleMolecule />
    <div class="flex flex-col md:flex-row w-full md:w-[60%] items-center space-y-5 md:space-y-4 md:space-x-5">
      <FileUploadOrganism class="w-full flex-2" />
      <ImageUploadOrganism class="w-full flex-1" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ImageUploadOrganism from '../components/Organisms/ImageUploadOrganism.vue';
import FileUploadOrganism from '../components/Organisms/FileUploadOrganism.vue';
import TitleMolecule from '../components/Molecules/TitleMolecule.vue';
</script>
