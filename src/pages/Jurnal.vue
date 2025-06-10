<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg">
    <!-- Header dengan Icon Back -->
    <div class="flex items-center space-x-2 mb-10">
      <button @click="goBack" class="text-gray-600 hover:text-gray-800">
        <!-- Icon Back -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
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

      <!-- Input Catatan -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Catatan Harian
        </label>
        <textarea
          v-model="catatan"
          rows="4"
          placeholder="Tulis catatan harian Anda di sini..."
          class="w-full border border-gray-300 p-2 rounded-md focus:ring-pink-500 focus:border-pink-500"
          required
        ></textarea>
      </div>

      <!-- Notifikasi -->
      <div
        v-if="submitted"
        class="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center"
      >
        Catatan berhasil disimpan!
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const tanggal = ref("");
const catatan = ref("");
const submitted = ref(false);
const loading = ref(false);

const router = useRouter();

const submitJurnal = () => {
  loading.value = true;

  // Simulasi loading 3 detik
  setTimeout(() => {
    console.log("Tanggal:", tanggal.value);
    console.log("Catatan:", catatan.value);

    loading.value = false;
    submitted.value = true;

    // Reset dan redirect jika perlu
    setTimeout(() => {
      submitted.value = false;
      router.push("/viewjurnal"); // Navigasi setelah selesai
    }, 1500);
  }, 3000);
};

const goBack = () => {
  router.go(-1); // Navigasi ke halaman sebelumnya
};
</script>
