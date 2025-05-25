<script setup>
import { Icon } from "@iconify/vue";
import Artikel from "./Artikel.vue";
</script>
<template>
  <div class="p-5 bg-gray-50 min-h-screen font-poppins">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-medium text-gray-800">
        Halo, <span class="font-bold text-blue-600">Arief</span>
      </h1>
      <div class="flex items-center space-x-4 text-gray-500">
        <Icon
          icon="mdi:bell-outline"
          class="hover:text-yellow-500"
          width="26"
          height="26"
        />
        <Icon
          icon="mdi:account-circle-outline"
          class="hover:text-blue-500"
          width="28"
          height="28"
        />
      </div>
    </div>

    <!-- Fitur -->
    <div class="mt-4">
      <h2 class="text-lg font-semibold text-gray-700 mb-3">Fitur</h2>
      <div class="space-y-3">
        <!-- Gizi Harian -->
        <div
          class="flex items-center justify-between bg-white rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition duration-200 cursor-pointer"
        >
          <div class="flex items-center space-x-3">
            <Icon
              icon="mdi:food-apple"
              class="text-green-500"
              width="22"
              height="22"
            />
            <span class="text-gray-800 font-medium">Gizi Harian</span>
          </div>
          <span class="text-gray-400 text-lg">&rarr;</span>
        </div>

        <!-- Jurnal Harian -->
        <div
          class="flex items-center justify-between bg-white rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition duration-200 cursor-pointer"
        >
          <div class="flex items-center space-x-3">
            <Icon
              icon="mdi:book-open-variant"
              class="text-blue-500"
              width="22"
              height="22"
            />
            <span class="text-gray-800 font-medium">Jurnal Harian</span>
          </div>
          <span class="text-gray-400 text-lg">&rarr;</span>
        </div>

        <!-- Mood Harian -->
        <div
          class="flex items-center justify-between bg-white rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition duration-200 cursor-pointer"
        >
          <div class="flex items-center space-x-3">
            <Icon
              icon="mdi:emoticon-happy-outline"
              class="text-yellow-500"
              width="22"
              height="22"
            />
            <span class="text-gray-800 font-medium">Mood Harian</span>
          </div>
          <span class="text-gray-400 text-lg">&rarr;</span>
        </div>
      </div>
    </div>

    <!-- Artikel -->
    <div class="mt-10">
      <h2 class="text-lg font-semibold text-gray-700 mb-3">Artikel</h2>
      <!-- Konten artikel dapat ditambahkan di sini -->
      <Artikel />
    </div>
  </div>
</template>
