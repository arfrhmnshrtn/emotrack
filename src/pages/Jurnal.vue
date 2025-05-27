<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg ">
    <h1 class="text-2xl font-bold text-pink-600 text-center mb-6">
      Catatan Harian Ibu Hamil
    </h1>

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

      <!-- Tombol Simpan -->
      <div class="text-right">
        <button
          type="submit"
          class="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition"
        >
          Simpan
        </button>
      </div>
    </form>

    <div
      v-if="submitted"
      class="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center"
    >
      Catatan berhasil disimpan!
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const tanggal = ref("");
const catatan = ref("");
const submitted = ref(false);

const submitJurnal = () => {
  console.log("Tanggal:", tanggal.value);
  console.log("Catatan:", catatan.value);
  submitted.value = true;

  // Reset notifikasi setelah 3 detik
  setTimeout(() => {
    submitted.value = false;
  }, 3000);
};
</script>
