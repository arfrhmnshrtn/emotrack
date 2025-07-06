<script>
export default {
  data() {
    return {
      jurnalHarian: [
        {
          tanggal: "2025-06-10",
          keluhan: "Saya merasa mual sepanjang hari dan sulit makan.",
          rekomendasi:
            "Cobalah makan dalam porsi kecil tetapi sering, hindari makanan berminyak, dan pastikan cukup minum air putih.",
        },
        {
          tanggal: "2025-06-09",
          keluhan: "Saya mengalami nyeri punggung ketika duduk terlalu lama.",
          rekomendasi:
            "Lakukan peregangan ringan secara berkala dan gunakan bantal penyangga saat duduk.",
        },
        {
          tanggal: "2025-06-08",
          keluhan: "Saya sering merasa lelah meskipun sudah cukup istirahat.",
          rekomendasi:
            "Pastikan asupan zat besi dan lakukan aktivitas ringan seperti jalan pagi untuk membantu sirkulasi darah.",
        },
      ],
    };
  },
  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script>

<template>
  <div class="max-w-3xl mx-auto p-6 bg-white rounded-xl space-y-6">
    <!-- Header -->
    <div class="flex items-center space-x-2 mb-4">
      <button @click="goBack" class="text-gray-600 hover:text-gray-800">
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
      <h1 class="text-xl font-semibold text-gray-800">View Jurnal Harian</h1>
    </div>

    <!-- Daftar Jurnal -->
    <div
      v-for="(jurnal, index) in jurnalHarian"
      :key="index"
      class="p-4 border rounded-lg space-y-3 mb-4"
    >
      <div>
        <h3 class="text-lg font-semibold text-gray-700">
          Tanggal: {{ jurnal.tanggal }}
        </h3>
        <p class="text-gray-600 mt-2">
          <strong>Keluhan:</strong> {{ jurnal.keluhan }}
        </p>
      </div>
      <div class="bg-blue-50 p-3 rounded-lg">
        <p class="text-blue-700">
          <strong>Rekomendasi AI:</strong> {{ jurnal.rekomendasi }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Opsional: Tambahan styling */
</style>
