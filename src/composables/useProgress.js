import { ref, onMounted, watch } from 'vue';

const STORAGE_KEY = 'network_detective_progress';

export function useProgress() {
  const userProgress = ref({
    solvedQuestions: [],
    caseScores: {},
    commendations: []
  });

  // Load progress from localStorage when the composable is first used
  onMounted(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      userProgress.value = JSON.parse(savedProgress);
    }
  });

  // Watch for changes in progress and save them to localStorage
  watch(userProgress, (newProgress) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  }, { deep: true });

  const addSolvedQuestion = (questionId) => {
    if (!userProgress.value.solvedQuestions.includes(questionId)) {
      userProgress.value.solvedQuestions.push(questionId);
    }
  };

  const updateCaseScore = (caseName, score) => {
    const currentScore = userProgress.value.caseScores[caseName] || 0;
    if (score > currentScore) {
      userProgress.value.caseScores[caseName] = score;
    }
  };

  const addCommendation = (commendation) => {
    if (!userProgress.value.commendations.includes(commendation)) {
      userProgress.value.commendations.push(commendation);
    }
  };

  return {
    userProgress,
    addSolvedQuestion,
    updateCaseScore,
    addCommendation
  };
}
