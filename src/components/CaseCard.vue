<template>
  <div class="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-lg">
    <h3 class="text-xl font-bold text-amber-400 mb-2">{{ caseFile.name }}</h3>
    <p class="text-gray-400 mb-4">{{ caseFile.questionCount }} Clues</p>
    <ProgressBar :progress="progress" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import ProgressBar from './ProgressBar.vue';

defineProps({
  caseFile: {
    type: Object,
    required: true
  },
  progress: {
    type: Number,
    required: true,
    default: 0
  }
});
</script>
