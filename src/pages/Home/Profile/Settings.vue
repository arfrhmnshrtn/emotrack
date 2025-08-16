<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const logout = () => {
  localStorage.removeItem("user");
  router.push("/");
};
</script>

<template>
  <div class="max-w-2xl mx-auto p-6">
    <div class="p-6">
      <!-- Judul -->
      <h1 class="text-2xl font-semibold text-gray-800 mb-2 text-center">
        Pengaturan
      </h1>
      <p class="text-gray-500 mb-6">
        Kelola akun, keamanan, dan preferensi aplikasi Anda.
      </p>

      <!-- List Pengaturan -->
      <ul class="space-y-3">
        <!-- Edit Profil -->
        <li>
          <router-link
            to="/edit-profile"
            class="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 hover:bg-pink-50 hover:border-pink-300 transition"
          >
            <span class="text-gray-700 font-medium">Edit Profil</span>
            <span class="text-blue-500 text-sm">›</span>
          </router-link>
        </li>

        <!-- Ubah Kata Sandi -->
        <li>
          <router-link
            to="/profile/change-password"
            class="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 hover:bg-pink-50 hover:border-pink-300 transition"
          >
            <span class="text-gray-700 font-medium">Ubah Kata Sandi</span>
            <span class="text-blue-500 text-sm">›</span>
          </router-link>
        </li>

        <!-- Keluar -->
        <li>
          <button
            @click="logout"
            class="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-gray-200 hover:bg-red-50 hover:border-red-300 transition"
          >
            <span class="text-red-600 font-medium">Keluar</span>
            <span class="text-red-500 text-sm">›</span>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
