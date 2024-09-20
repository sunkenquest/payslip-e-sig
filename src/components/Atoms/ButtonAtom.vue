<template>
  <button
    @click="$emit('click')"
    type="button"
    :class="buttonClasses"
    class="text-white focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center"
  >
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'blue',
  },
});

const buttonClasses = computed(() => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
    red: 'bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800',
    green: 'bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
  };
  
  return colorMap[props.color] || colorMap.blue;
});
</script>
