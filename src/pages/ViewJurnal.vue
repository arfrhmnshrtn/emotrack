<script setup>
import { useRouter } from "vue-router";
const viewAllJournals = ref([]);
const loading = ref(true);
const { router } = useRouter();
import { onMounted, ref } from "vue";

const getId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.id || null;
  } catch {
    return null;
  }
};

const goBack = () => {
  router.back();
};

const fetchJournals = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/jurnal/${getId()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data jurnal");
    }

    const data = await response.json();
    viewAllJournals.value = data.jurnals || [];
  } catch (error) {
    console.error("Error fetching journals:", error);
    alert("Terjadi kesalahan saat mengambil data jurnal.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchJournals();
});
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
      v-for="(jurnal, index) in viewAllJournals"
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
          <strong>Rekomendasi AI:</strong> {{ jurnal.response }}
        </p>
      </div>
      <div class="flex justify-end">
        <router-link
          :to="{ name: 'detailJurnal', params: { id: jurnal.id } }"
          class="text-blue-500 hover:underline"
        >
          Lihat Detail
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Opsional: Tambahan styling */
</style>
