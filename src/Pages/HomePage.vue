<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <TitleMolecule />
    <FileUploadOrganism />
    <ImageUploadOrganism />
  </div>
</template>

<script lang="ts" setup>
import ImageUploadOrganism from '../components/Organisms/ImageUploadOrganism.vue';
import FileUploadOrganism from '../components/Organisms/FileUploadOrganism.vue';
import TitleMolecule from '../components/Molecules/TitleMolecule.vue';
</script>