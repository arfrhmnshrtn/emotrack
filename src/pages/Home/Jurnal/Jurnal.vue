<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

const tanggal = ref("");
const selectedMood = ref("");
const keluhan = ref("");
const submitted = ref(false);
const loading = ref(false);

const notifikasi = ref("");

const router = useRouter();

const moods = [
  { icon: "😄", label: "Senang" },
  { icon: "🙂", label: "Baik" },
  { icon: "😐", label: "Biasa" },
  { icon: "😔", label: "Sedih" },
  { icon: "😡", label: "Marah" },
];

const getId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.id || null;
  } catch {
    return null;
  }
};

const submitJurnal = async () => {
  loading.value = true;
  submitted.value = false;
  try {
    const response = await fetch("http://202.10.35.143:3000/api/jurnal/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: getId(),
        tanggal: tanggal.value,
        mood: selectedMood.value,
        keluhan: keluhan.value,
      }),
    });

    if (response.ok) {
      router.push("/viewjurnal");
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal menyimpan catatan.");
    }
  } catch (error) {
    console.error("Error submitting jurnal:", error);
    notifikasi.value = error.message;
  } finally {
    loading.value = false;
    submitted.value = true;
  }
};

const selectMood = (mood) => {
  selectedMood.value = mood;
  console.log(`Mood selected: ${mood}`);
};
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg">
    <!-- Header dengan Icon Back -->
    <div class="flex items-center space-x-2 mb-10">
      <Icon
        icon="mdi:arrow-left"
        class="w-6 h-6 cursor-pointer text-gray-700"
        @click="router.back()"
      />
      <h2 class="text-xl font-semibold text-gray-800">Jurnal Harian</h2>
    </div>

    <form @submit.prevent="submitJurnal" class="space-y-4">
      <!-- Input Tanggal -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Tanggal
        </label>
        <input
          type="date"
          v-model="tanggal"
          class="w-full border border-gray-300 p-2 rounded-md focus:ring-pink-500 focus:border-pink-500"
          required
        />
      </div>

      <!-- Input Mood -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Mood Hari Ini
        </label>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="mood in moods"
            :key="mood.label"
            @click.prevent="selectMood(mood.label)"
            type="button"
            :class="[
              'w-18 flex flex-col items-center justify-center bg-white border rounded-xl shadow-sm transition',
              selectedMood === mood.label
                ? 'border-pink-500 ring-2 ring-pink-400'
                : 'border-gray-300 hover:bg-pink-500 focus:outline-none',
            ]"
          >
            <span class="text-xl mb-1">{{ mood.icon }}</span>
            <span class="text-xs text-gray-700 text-center">{{
              mood.label
            }}</span>
          </button>
        </div>
      </div>

      <!-- Input Catatan -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Catatan Harian
        </label>
        <textarea
          v-model="keluhan"
          rows="4"
          placeholder="Tulis catatan harian Anda di sini..."
          class="w-full border border-gray-300 p-2 rounded-md focus:ring-pink-500 focus:border-pink-500"
          required
        ></textarea>
      </div>

      <!-- Notifikasi -->
      <div
        v-if="submitted"
        class="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center"
      >
        {{ notifikasi }}
      </div>

      <!-- Tombol Simpan -->
      <div class="text-right">
        <button
          type="submit"
          :disabled="loading"
          class="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading">Menyimpan...</span>
          <span v-else>Simpan</span>
        </button>
      </div>
    </form>

    <!-- Loading Overlay -->
    <div
      v-if="loading"
      class="fixed inset-0 bg-gray-50/60 flex items-center justify-center z-50"
    >
      <svg
        class="animate-spin h-10 w-10 text-pink-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
        ></path>
      </svg>
    </div>
  </div>
</template>
