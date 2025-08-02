<template>
  <div>
    <div class="flex justify-between mb-1">
      <span class="text-base font-medium text-gray-400">Progress</span>
      <span class="text-sm font-medium text-gray-400">{{ progress }}%</span>
    </div>
    <div class="w-full bg-gray-700 rounded-full h-2.5">
      <div class="bg-amber-500 h-2.5 rounded-full" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  progress: {
    type: Number,
    required: true,
    default: 0
  }
});
</script>
