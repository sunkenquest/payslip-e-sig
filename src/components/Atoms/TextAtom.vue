<template>
    <h1>{{ title }}</h1>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

const props = defineProps<{ title: string }>();
console.log(props);

</script>