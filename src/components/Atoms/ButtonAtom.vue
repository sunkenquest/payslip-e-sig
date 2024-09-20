<template>
  <button @click="$emit('click')" type="button" :class="buttonClasses"
    class="text-white focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center">
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
    blue: 'button-color-blue',
    red: 'button-color-red',
    green: 'button-color-green',
  };

  return colorMap[props.color] || colorMap.blue;
});
</script>
