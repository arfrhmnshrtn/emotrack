<script setup>
import { Icon } from "@iconify/vue";
import NavbarBottom from "../components/NavbarBottom.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col items-center pt-10 px-6">
    <!-- Profile Avatar -->
    <div
      class="w-24 h-24 rounded-full bg-pink-200 flex items-center justify-center shadow-lg mb-4"
    >
      <Icon icon="mdi:account" class="text-white w-12 h-12" />
    </div>

    <!-- Name -->
    <h2 class="text-xl font-semibold text-pink-700">Halo, Ibu Hamil 🌸</h2>
    <p class="text-sm text-gray-500 mb-6">Profil pengguna & pengaturan akun</p>

    <!-- Info Card -->
    <div class="w-full bg-white rounded-xl shadow-md p-4 space-y-3">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Nama</span>
        <span class="font-medium text-gray-800">Ibu Aisyah</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Usia Kehamilan</span>
        <span class="font-medium text-gray-800">24 Minggu</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Email</span>
        <span class="font-medium text-gray-800">ibuaisyah@email.com</span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="w-full mt-6 space-y-4">
      <button
        class="w-full bg-white flex items-center gap-3 px-4 py-3 rounded-xl shadow hover:bg-pink-100 transition"
      >
        <Icon icon="mdi:cog" class="text-pink-500 w-5 h-5" />
        <span>Pengaturan Akun</span>
      </button>
      <button
        class="w-full bg-white flex items-center gap-3 px-4 py-3 rounded-xl shadow hover:bg-pink-100 transition"
      >
        <Icon icon="mdi:help-circle-outline" class="text-pink-500 w-5 h-5" />
        <span>Bantuan</span>
      </button>
      <button
        class="w-full bg-pink-500 text-white px-4 py-3 rounded-xl shadow hover:bg-pink-600 transition"
      >
        <Icon icon="mdi:logout" class="w-5 h-5 inline mr-2" />
        Keluar
      </button>
    </div>

    <NavbarBottom />
  </div>
</template>
