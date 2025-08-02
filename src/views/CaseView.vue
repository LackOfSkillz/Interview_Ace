<template>
  <div v-if="currentQuestion" class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-amber-400 mb-2">{{ caseName }}</h1>
    <p class="text-gray-400 mb-6">Clue {{ currentQuestionIndex + 1 }} of {{ questionsInCase.length }}</p>

    <div class="bg-gray-800 p-8 rounded-lg shadow-lg">
      <!-- Question Clue -->
      <p class="text-xl text-white mb-6">{{ currentQuestion.clue }}</p>

      <!-- Answer Options -->
      <div class="space-y-4">
        <div v-if="currentQuestion.type === 'multiple-choice'">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="selectAnswer(option)"
            :disabled="answerSubmitted"
            class="w-full text-left p-4 rounded-lg transition-colors duration-200"
            :class="getOptionClass(option)"
          >
            {{ option }}
          </button>
        </div>

        <div v-if="currentQuestion.type === 'fill-in-the-blank'">
          <input
            type="text"
            v-model="userFillAnswer"
            :disabled="answerSubmitted"
            @keyup.enter="submitAnswer"
            class="w-full p-4 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:outline-none focus:border-amber-500"
            placeholder="Type your answer..."
          />
        </div>
      </div>

      <!-- Submission & Feedback -->
      <div class="mt-8">
        <button
          v-if="!answerSubmitted"
          @click="submitAnswer"
          :disabled="!selectedAnswer && !userFillAnswer"
          class="w-full bg-amber-500 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-amber-600 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          Submit Deduction
        </button>

        <div v-if="answerSubmitted">
          <div class="p-4 rounded-lg mb-4" :class="isCorrect ? 'bg-green-900/50' : 'bg-red-900/50'">
            <h3 class="font-bold text-lg" :class="isCorrect ? 'text-green-400' : 'text-red-400'">
              {{ isCorrect ? 'Correct Deduction!' : 'A False Lead!' }}
            </h3>
            <p class="text-gray-300 mt-2">{{ currentQuestion.explanation }}</p>
          </div>
          <button
            @click="nextQuestion"
            class="w-full bg-gray-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-500 transition-colors"
          >
            {{ isLastQuestion ? 'Complete Case' : 'Next Clue' }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center">
    <p class="text-2xl">Loading case...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import allQuestions from '../data/questions.json';
import { useProgress } from '../composables/useProgress';

const route = useRoute();
const router = useRouter();
const { addSolvedQuestion } = useProgress();

const caseName = ref(route.params.caseId);
const questionsInCase = ref([]);
const currentQuestionIndex = ref(0);

const selectedAnswer = ref(null);
const userFillAnswer = ref('');
const answerSubmitted = ref(false);
const isCorrect = ref(false);

// Fetch and filter questions for the current case
onMounted(() => {
  questionsInCase.value = allQuestions.filter(q => q.caseName === caseName.value);
});

const currentQuestion = computed(() => {
  return questionsInCase.value[currentQuestionIndex.value];
});

const isLastQuestion = computed(() => {
  return currentQuestionIndex.value === questionsInCase.value.length - 1;
});

const selectAnswer = (option) => {
  if (!answerSubmitted.value) {
    selectedAnswer.value = option;
  }
};

const submitAnswer = () => {
  if (answerSubmitted.value) return;

  const answer = currentQuestion.value.type === 'fill-in-the-blank' 
    ? userFillAnswer.value.trim().toLowerCase()
    : selectedAnswer.value;

  isCorrect.value = answer === currentQuestion.value.answer;
  answerSubmitted.value = true;

  if (isCorrect.value) {
    addSolvedQuestion(currentQuestion.value.id);
  }
};

const nextQuestion = () => {
  if (isLastQuestion.value) {
    router.push('/'); // Go back to home when case is complete
  } else {
    currentQuestionIndex.value++;
    selectedAnswer.value = null;
    userFillAnswer.value = '';
    answerSubmitted.value = false;
    isCorrect.value = false;
  }
};

const getOptionClass = (option) => {
  if (!answerSubmitted.value) {
    return selectedAnswer.value === option ? 'bg-amber-700' : 'bg-gray-700 hover:bg-gray-600';
  }

  const isCorrectAnswer = option === currentQuestion.value.answer;
  if (isCorrectAnswer) {
    return 'bg-green-500 text-white';
  }
  if (option === selectedAnswer.value && !isCorrect.value) {
    return 'bg-red-500 text-white';
  }
  return 'bg-gray-700 cursor-not-allowed';
};
</script>