<script setup>
import { useRouter } from "vue-router";
import Loading from "../../../components/Loading.vue";
const viewAllJournals = ref([]);
const loading = ref(false);
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

const cutText = (text, maxWords = 20) => {
  if (!text) return "";
  const words = text.split(/\s+/);
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
};

const fetchJournals = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      `http://202.10.35.143:3000/api/jurnal/${getId()}`,
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
    console.log("Fetched Journals:", data);
    viewAllJournals.value = (data.jurnals || []).sort((a, b) => {
      return new Date(b.tanggal) - new Date(a.tanggal);
    });
  } catch (error) {
    console.error("Error fetching journals:", error);
    alert("Terjadi kesalahan saat mengambil data jurnal.");
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

onMounted(() => {
  fetchJournals();
});
</script>

<template>
  <div class="max-w-3xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex items-center mb-6 space-x-3">
      <button
        @click="goBack"
        class="text-gray-600 hover:text-blue-600 transition duration-200"
      >
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
      <h1 class="text-2xl font-bold text-gray-800">Jurnal Harian</h1>
    </div>

    <!-- buat di tengah halaman -->
    <div
      class="fixed inset-0 flex items-center justify-center z-50"
      v-if="viewAllJournals.length === 0 && !loading"
    >
      <p class="text-xl text-gray-600">Belum ada Jurnal</p>
    </div>

    <!-- Daftar Jurnal -->
    <router-link
      v-for="(jurnal, index) in viewAllJournals"
      :key="index"
      :to="{ name: 'detailJurnal', params: { id: jurnal.id } }"
      class="bg-white shadow-md rounded-2xl p-5 mb-6 hover:shadow-lg transition duration-300 cursor-pointer block"
    >
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold text-gray-700">
            {{ formatDate(jurnal.tanggal) }}
          </h3>
          <span class="text-sm text-gray-500">#{{ jurnal.id }}</span>
        </div>

        <p class="text-sm text-gray-600 leading-relaxed">
          <strong class="font-medium text-gray-700">Keluhan:</strong>
          {{ jurnal.keluhan }}
        </p>

        <div class="bg-blue-100 rounded-lg p-4">
          <p class="text-sm text-blue-800">
            <strong class="font-semibold">Rekomendasi AI:</strong>
            {{ cutText(jurnal.response) }}
          </p>
        </div>
      </div>
    </router-link>

    <Loading v-if="loading" />
  </div>
</template>

<style scoped>
/* Tambahan opsional untuk efek transisi Android feel */
@media (hover: hover) {
  .hover\:shadow-lg:hover {
    transform: translateY(-2px);
  }
}
</style>
