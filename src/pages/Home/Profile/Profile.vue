<script setup>
import { Icon } from "@iconify/vue";
import NavbarBottom from "../../../components/NavbarBottom.vue";

import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
const router = useRouter();

const dataUser = ref({});
const showConfirm = ref(false); // Pop-up status

const getUser = () => {
  const user = localStorage.getItem("user");
  // console.log(user);
  if (user) {
    const userJson = JSON.parse(user);
    dataUser.value = userJson;
  }
};

const countUsiaKehamilan = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const userJson = JSON.parse(user);
    const hpht = new Date(userJson.hpht);
    const today = new Date();

    // Hitung selisih dalam milidetik
    const selisihMs = today - hpht;

    // Ubah ke hari
    const selisihHari = Math.floor(selisihMs / (1000 * 60 * 60 * 24));

    // Ubah ke minggu
    const usiaKehamilanMinggu = Math.floor(selisihHari / 7);

    return usiaKehamilanMinggu;
  } else {
    return 0; // Jika user tidak ditemukan
  }
};

const logout = () => {
  localStorage.removeItem("user");
  router.push("/");
};

onMounted(() => {
  getUser();
});
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
    <h2 class="text-xl font-semibold text-pink-700">
      Halo, {{ dataUser.username }} 🌸
    </h2>
    <p class="text-sm text-gray-500 mb-6">Profil pengguna & pengaturan akun</p>

    <!-- Info Card -->
    <div class="w-full bg-white rounded-xl shadow-md p-4 space-y-3">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Nama</span>
        <span class="font-medium text-gray-800">{{ dataUser.name }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Usia Kehamilan</span>
        <span class="font-medium text-gray-800"
          >{{ countUsiaKehamilan() }} Minggu</span
        >
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Email</span>
        <span class="font-medium text-gray-800">{{ dataUser.email }}</span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="w-full mt-6 space-y-4">
      <router-link to="/settings" class="mb-2">
        <button
          class="w-full bg-white flex mb-2 items-center gap-3 px-4 py-3 rounded-xl shadow hover:bg-pink-100 transition"
        >
          <Icon icon="mdi:cog" class="text-pink-500 w-5 h-5" />
          <span>Pengaturan Akun</span>
        </button>
      </router-link>

      <router-link to="/bantuan" class="mb-5">
        <button
          class="w-full bg-white flex mb-2 items-center gap-3 px-4 py-3 rounded-xl shadow hover:bg-pink-100 transition"
        >
          <Icon icon="mdi:cog" class="text-pink-500 w-5 h-5" />
          <span>Pusat Bantuan</span>
        </button>
      </router-link>

      <!-- Tombol Logout -->
      <button
        class="w-full bg-pink-500 text-white px-4 py-3 mt-8 rounded-xl shadow hover:bg-pink-600 transition"
        @click="showConfirm = true"
      >
        <Icon icon="mdi:logout" class="w-5 h-5 inline mr-2" />
        Keluar
      </button>
    </div>

    <!-- Pop-up Konfirmasi -->
    <div
      v-if="showConfirm"
      class="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white flex flex-col justify-center h-1/4 w-full m-8 p-6 rounded-xl shadow-xl text-center"
      >
        <p class="text-lg mb-4 text-gray-800">Yakin ingin keluar?</p>
        <div class="flex justify-center gap-4">
          <button
            @click="showConfirm = false"
            class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Batal
          </button>
          <button
            @click="logout"
            class="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
          >
            Keluar
          </button>
        </div>
      </div>
    </div>

    <NavbarBottom />
  </div>
</template>
