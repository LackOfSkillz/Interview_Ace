<template>
  <div>
    <h2 class="text-3xl font-bold mb-6 text-amber-400">Case Files</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link 
        v-for="(caseFile, index) in cases"
        :key="index"
        :to="`/case/${caseFile.name}`"
        class="focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg"
      >
        <CaseCard :caseFile="caseFile" :progress="getCaseProgress(caseFile.name)" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import allQuestions from '../data/questions.json';
import CaseCard from '../components/CaseCard.vue';
import { useProgress } from '../composables/useProgress';

const cases = ref([]);
const { userProgress } = useProgress();

// Group questions by case name
onMounted(() => {
  const caseMap = new Map();
  allQuestions.forEach(q => {
    if (!caseMap.has(q.caseName)) {
      caseMap.set(q.caseName, { name: q.caseName, questionCount: 0, questionIds: [] });
    }
    const caseData = caseMap.get(q.caseName);
    caseData.questionCount++;
    caseData.questionIds.push(q.id);
  });
  cases.value = Array.from(caseMap.values());
});

const getCaseProgress = (caseName) => {
  const caseData = cases.value.find(c => c.name === caseName);
  if (!caseData || !userProgress.value.solvedQuestions) return 0;

  const solvedInCase = caseData.questionIds.filter(id => userProgress.value.solvedQuestions.includes(id));
  const progress = (solvedInCase.length / caseData.questionCount) * 100;
  return Math.round(progress);
};

</script>