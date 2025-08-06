<script setup>
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Loading from "../components/Loading.vue";
import { marked } from "marked";
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const gizi = ref({});

const id = route.params.id;

const formatMessage = (text) => {
  const cleaned = (text || "")
    .replace(/^\*\s+/gm, "- ") // bintang jadi dash list
    .replace(/\n{2,}/g, "\n\n"); // konsisten newline

  const html = marked.parse(cleaned);
  return html;
};

const fetchGiziDetail = async () => {
  loading.value = true;
  try {
    const response = await fetch(
      `http://localhost:3000/api/gizi/detail/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil detail gizi");
    }

    const data = await response.json();
    gizi.value = data.gizi;
  } catch (error) {
    console.error("Error fetching gizi detail:", error);
    alert("Terjadi kesalahan saat mengambil detail gizi.");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchGiziDetail();
});
</script>

<template>
  <div class="min-h-screen bg-[#F5F5F5]">
    <!-- App Bar -->
    <div class="flex items-center px-4 py-3 bg-white shadow">
      <button @click="router.back()" class="mr-3 text-gray-700">
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
      <h1 class="text-lg font-medium text-gray-900">Detail Gizi</h1>
    </div>

    <!-- Content -->
    <div class="px-4 py-6">
      <div class="bg-white rounded-lg shadow-sm p-5 space-y-4">
        <div>
          <h2 class="text-sm text-gray-500 mb-1">Tanggal</h2>
          <p class="text-base text-gray-800 font-medium">
            {{ gizi.tanggal }}
          </p>
        </div>
        <div>
          <h2 class="text-sm text-gray-500 mb-1">Waktu</h2>
          <p class="text-base text-gray-800 font-medium">
            {{ gizi.waktu }}
          </p>
        </div>
        <div>
          <h2 class="text-sm text-gray-500 mb-1">Makanan</h2>
          <p class="text-base text-gray-700">
            {{ gizi.makanan }}
          </p>
        </div>
        <div>
          <h2 class="text-sm text-gray-500 mb-1">Hasil</h2>
          <div class="bg-gray-50 border border-gray-200 p-4 rounded-xl shadow">
            <div class="prose prose-sm max-w-none text-gray-800">
              <div v-html="formatMessage(gizi.response)"></div>
            </div>
          </div>
        </div>
      </div>
      <Loading v-if="loading" />
    </div>
  </div>
</template>
