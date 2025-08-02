<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-amber-400 mb-6">Detective's Ledger</h1>

    <div class="bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-white mb-4">Case Summary</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Total Solved Card -->
        <div class="bg-gray-700 p-6 rounded-lg">
          <p class="text-sm text-gray-400">Total Clues Solved</p>
          <p class="text-3xl font-bold text-white">{{ totalSolved }}</p>
        </div>

        <!-- Cases Attempted Card -->
        <div class="bg-gray-700 p-6 rounded-lg">
          <p class="text-sm text-gray-400">Cases Attempted</p>
          <p class="text-3xl font-bold text-white">{{ casesAttemptedCount }}</p>
        </div>
      </div>

      <!-- Detailed Progress -->
      <div class="mt-8">
        <h3 class="text-xl font-bold text-white mb-4">Progress by Case</h3>
        <ul v-if="casesWithProgress.length > 0" class="space-y-4">
          <li v-for="caseData in casesWithProgress" :key="caseData.name" class="bg-gray-700 p-4 rounded-lg">
            <p class="font-bold text-amber-400">{{ caseData.name }}</p>
            <p class="text-gray-300">{{ caseData.solved }} / {{ caseData.total }} clues solved</p>
            <ProgressBar :progress="(caseData.solved / caseData.total) * 100" class="mt-2" />
          </li>
        </ul>
        <p v-else class="text-gray-400">No cases attempted yet. The game is afoot!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useProgress } from '../composables/useProgress';
import allQuestions from '../data/questions.json';
import ProgressBar from '../components/ProgressBar.vue';

const { userProgress } = useProgress();

const totalSolved = computed(() => userProgress.value.solvedQuestions.length);

const casesWithProgress = computed(() => {
  const caseMap = new Map();
  allQuestions.forEach(q => {
    if (!caseMap.has(q.caseName)) {
      caseMap.set(q.caseName, { name: q.caseName, total: 0, solved: 0, questionIds: [] });
    }
    const caseData = caseMap.get(q.caseName);
    caseData.total++;
    caseData.questionIds.push(q.id);
  });

  userProgress.value.solvedQuestions.forEach(solvedId => {
    const caseName = allQuestions.find(q => q.id === solvedId)?.caseName;
    if (caseName && caseMap.has(caseName)) {
      caseMap.get(caseName).solved++;
    }
  });

  return Array.from(caseMap.values()).filter(c => c.solved > 0);
});

const casesAttemptedCount = computed(() => casesWithProgress.value.length);

</script>
