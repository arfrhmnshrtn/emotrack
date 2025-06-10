<script setup>
import data from "../assets/artikels.json";

const artikels = data.artikels;
</script>

<template>
  <router-link to="/detailartikel">
    <div class="space-y-4 bg-gray-50">
      <!-- Artikel 1 -->
      <div
        class="flex items-start space-x-4 bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition"
        v-for="artikel in artikels"
        v-bind:key="artikel.id"
      >
        <!-- Gambar -->
        <div class="w-16 h-16 rounded-lg bg-gray-300 flex-shrink-0">
          <img
            :src="artikel.img"
            alt="Gambar Artikel"
            class="w-full h-full object-cover rounded-lg"
          />
        </div>

        <!-- Konten -->
        <div class="flex flex-col">
          <!-- <span class="text-sm text-pink-600 font-medium mb-1">{{
          artikel.date
        }}</span> -->
          <h3 class="text-base font-semibold text-gray-800">
            {{ artikel.title }}
          </h3>
        </div>
      </div>

      <!-- <div class="flex justify-center">
      <button
        class="bg-pink-600 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Selanjutnya
      </button>
    </div> -->
    </div>
  </router-link>
</template>
