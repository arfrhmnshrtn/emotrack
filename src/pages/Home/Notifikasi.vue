<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  router.go(-1); // Navigasi ke halaman sebelumnya
  //   console.log("Kembali ke halaman sebelumnya");
};

const notifications = [
  {
    id: 1,
    title: "Pemberitahuan 1",
    message: "Isi pemberitahuan 1 disini.",
  },
  {
    id: 2,
    title: "Pemberitahuan 2",
    message: "Isi pemberitahuan 2 disini.",
  },
  {
    id: 3,
    title: "Pemberitahuan 3",
    message: "Isi pemberitahuan 3 disini.",
  },
];
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="flex items-center space-x-2 p-5 bg-white shadow-sm">
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
      <h2 class="text-xl font-semibold text-gray-800 w-full text-center">
        Notifikasi
      </h2>
    </div>

    <!-- Section Notifikasi -->
    <div class="p-5 space-y-4">
      <div
        v-for="(notif, index) in notifications"
        :key="index"
        class="bg-white rounded-xl shadow-sm p-4 flex items-start space-x-3 hover:shadow-md transition"
      >
        <div class="text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mt-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 
              3.582-8 8 3.582 8 8 8z"
            />
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-gray-800">{{ notif.title }}</h3>
          <p class="text-sm text-gray-600">{{ notif.message }}</p>
          <span class="text-xs text-gray-400">{{ notif.time }}</span>
        </div>
      </div>

      <!-- Jika tidak ada notifikasi -->
      <div
        v-if="notifications.length === 0"
        class="text-center text-gray-400 py-10"
      >
        Tidak ada notifikasi saat ini.
      </div>
    </div>
  </div>
</template>
