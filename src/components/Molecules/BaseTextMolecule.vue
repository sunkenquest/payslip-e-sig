<template>
  <div>
    <h2>{{ title }}</h2>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{
  title: string;
}>();
console.log(props);
</script>