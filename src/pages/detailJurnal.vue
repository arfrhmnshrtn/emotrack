<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const viewJurnal = ref({});

const getJurnalId = route.params.id;

const fetchJournals = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/jurnal/detail/${getJurnalId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    viewJurnal.value = data.jurnal;
    // console.log(viewJurnal.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchJournals();
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
      <h1 class="text-lg font-medium text-gray-900">Detail Jurnal</h1>
    </div>

    <!-- Content -->
    <div class="px-4 py-6">
      <div class="bg-white rounded-lg shadow-sm p-5 space-y-4">
        <div>
          <h2 class="text-sm text-gray-500 mb-1">Tanggal</h2>
          <p class="text-base text-gray-800 font-medium">
            {{ viewJurnal.tanggal }}
          </p>
        </div>
        <div>
          <h2 class="text-sm text-gray-500 mb-1">Keluhan</h2>
          <p class="text-base text-gray-700">
            {{ viewJurnal.keluhan }}
          </p>
        </div>
        <div>
          <h2 class="text-sm text-gray-500 mb-1">Deskripsi</h2>
          <p class="text-base text-gray-700 whitespace-pre-line">
            {{ viewJurnal.response }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
