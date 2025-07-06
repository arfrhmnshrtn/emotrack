<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const moods = [
  { icon: "😄", label: "Senang" },
  { icon: "🙂", label: "Baik" },
  { icon: "😐", label: "Biasa" },
  { icon: "😔", label: "Sedih" },
  { icon: "😡", label: "Marah" },
];

const selectedMood = ref(null);

const selectMood = (mood) => {
  selectedMood.value = mood;
};

function goBack() {
  window.history.back();
}
</script>

<template>
  <!-- Header dengan Icon Back -->
  <div class="flex items-center space-x-2 mb-5 mt-8 ml-4">
    <Icon
      icon="mdi:arrow-left"
      class="w-6 h-6 cursor-pointer text-gray-700"
      @click="router.back()"
    />
    <h2 class="text-xl font-semibold text-gray-800">Jurnal Harian</h2>
  </div>

  <div class="max-w-md mx-auto p-6 bg-white rounded-xl">
    <div class="grid grid-cols-5 gap-4 text-center">
      <div
        v-for="(mood, index) in moods"
        :key="index"
        @click="selectMood(mood)"
        class="flex flex-col items-center cursor-pointer hover:scale-105 transition"
      >
        <span class="text-3xl">{{ mood.icon }}</span>
        <span class="text-sm mt-2 text-gray-600">{{ mood.label }}</span>
      </div>
    </div>

    <!-- Modal Pop-up -->
    <div
      v-if="selectedMood"
      class="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
        <p class="text-lg mb-4">
          Mood yang Anda pilih:
          <span class="text-2xl">{{ selectedMood.icon }}</span>
          <br />
          <span class="text-gray-700">{{ selectedMood.label }}</span>
        </p>
        <button
          @click="selectedMood = null"
          class="mt-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>
