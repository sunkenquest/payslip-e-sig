<template>
  <div class="main-container flex flex-col justify-center items-center space-y-5">
    <FileInput @change="handleFileChange" />
  </div>
</template>

<script lang="ts" setup>
import FileInput from '../Molecules/FileInputMolecule.vue';

const handleFileChange = (file: File) => {
  console.log('File selected:', file);
};
</script>