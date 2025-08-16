<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Loading from "../../../components/Loading.vue";
import { marked } from "marked";

const loading = ref(false);

const router = useRouter();
const allGizi = ref([]);

// Fungsi kembali
const goBack = () => {
  router.back();
};

const formatMessage = (text) => {
  const cleaned = (text || "")
    .replace(/^\*\s+/gm, "- ") // bintang jadi dash list
    .replace(/\n{2,}/g, "\n\n"); // konsisten newline

  const html = marked.parse(cleaned);
  return html;
};

// Ambil ID user dari localStorage
const getId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.id || null;
  } catch {
    return null;
  }
};

const upperCaseFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Potong teks AI
const cutText = (text, maxWords = 10) => {
  if (!text) return "";
  const words = text.split(/\s+/);
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : text;
};

// Format tanggal (YYYY-MM-DD ke DD MMM YYYY)
const formatDate = (dateStr) => {
  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    weekday: "long",
  };
  return new Date(dateStr).toLocaleDateString("id-ID", options);
};

// Ambil data gizi
const fetchGiziData = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      `http://202.10.35.143:3000/api/gizi/user/${getId()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Gagal mengambil data gizi");

    const data = await response.json();
    allGizi.value = data.gizis || [];
  } catch (error) {
    console.error("Error fetching gizi data:", error);
  } finally {
    loading.value = false;
  }
};

// Panggil saat komponen dimount
onMounted(() => {
  fetchGiziData();
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
      <h1 class="text-2xl font-bold text-gray-800">Data Gizi Harian</h1>
    </div>

    <div class="mb-4 text-gray-600">
      <p>
        Hari ini,
        {{ new Date().toLocaleDateString("id-ID", { weekday: "long" }) }}:
        <span class="font-semibold">{{
          new Date().toLocaleDateString("id-ID")
        }}</span>
      </p>
    </div>

    <!-- Daftar Gizi -->
    <router-link
      v-for="(gizi, index) in allGizi"
      :key="index"
      :to="{ name: 'DetailGizi', params: { id: gizi.id } }"
      class="bg-white shadow-md rounded-2xl p-5 mb-6 hover:shadow-lg transition duration-300 cursor-pointer block"
    >
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold text-gray-700">
            {{ formatDate(gizi.tanggal) }}
          </h3>
          <span class="text-sm text-gray-500">#{{ gizi.id }}</span>
        </div>

        <p class="text-sm text-gray-600 leading-relaxed">
          <strong class="font-medium text-gray-700">Waktu Makan:</strong>
          {{ upperCaseFirst(gizi.waktu) }}
        </p>

        <p class="text-sm text-gray-600 leading-relaxed">
          <strong class="font-medium text-gray-700">Makanan/Minuman:</strong>
          {{ upperCaseFirst(gizi.makanan) }}
        </p>

        <div class="bg-blue-100 rounded-lg p-4">
          <div class="text-sm text-blue-800">
            <strong class="font-semibold">Rekomendasi AI:</strong>
            <p v-html="formatMessage(cutText(gizi.response))"></p>
          </div>
        </div>
      </div>
    </router-link>

    <Loading v-if="loading" />
  </div>
</template>

<style scoped>
@media (hover: hover) {
  .hover\:shadow-lg:hover {
    transform: translateY(-2px);
  }
}
</style>
