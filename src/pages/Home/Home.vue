<script setup>
import { Icon } from "@iconify/vue";
import Artikel from "../../components/Artikel.vue";
import NavbarBottom from "../../components/NavbarBottom.vue";
import { onMounted, ref } from "vue";

const userName = ref("");

const getUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const userJson = JSON.parse(user);
    userName.value = userJson.name;
  }
};

const cutNameUser = () => {
  const name = userName.value;
  const splitName = name.split(" ");
  return splitName[0];
};

onMounted(() => {
  getUser();
});
</script>
<template>
  <div class="p-5 bg-gray-50 min-h-screen font-poppins">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-medium text-gray-800">
        Halo, <span class="font-bold text-pink-600">{{ cutNameUser() }}</span>
      </h1>
      <router-link to="/notifikasi">
        <div class="flex items-center space-x-4 text-gray-500">
          <Icon
            icon="mdi:bell"
            class="text-yellow-500 hover:text-yellow-500"
            width="26"
            height="26"
          />
        </div>
      </router-link>
    </div>

    <!-- Fitur -->
    <div class="mt-4">
      <h2 class="text-lg font-semibold text-gray-700 mb-3">Fitur</h2>
      <div class="space-y-3">
        <!-- Gizi Harian -->
        <div>
          <router-link to="/gizi" class="mb-10">
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
          </router-link>
        </div>

        <!-- Jurnal Harian -->
        <div>
          <router-link to="/jurnal">
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
          </router-link>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-3">Hasil</h2>
      <div class="bg-white rounded-xl p-5 shadow-sm space-y-4">
        <!-- Link Data Gizi -->
        <router-link
          to="/viewGizi"
          class="block bg-green-300 rounded-2xl hover:bg-green-400"
        >
          <div
            class="flex items-center justify-between px-3 py-2 rounded-md transition"
          >
            <span class="text-gray-800 font-medium">Lihat Data Gizi</span>
            <Icon
              icon="mdi:arrow-right"
              class="text-gray-400"
              width="20"
              height="20"
            />
          </div>
        </router-link>

        <!-- Link Data Jurnal -->
        <router-link
          to="/viewJurnal"
          class="block bg-blue-300 rounded-2xl hover:bg-blue-400"
        >
          <div
            class="flex items-center justify-between px-3 py-2 rounded-md transition"
          >
            <span class="text-gray-800 font-medium">Lihat Data Jurnal</span>
            <Icon
              icon="mdi:arrow-right"
              class="text-gray-400"
              width="20"
              height="20"
            />
          </div>
        </router-link>
      </div>
    </div>

    <!-- Artikel -->
    <div class="mt-10">
      <h2 class="text-lg font-semibold text-gray-700 mb-3">Artikel</h2>
      <!-- Konten artikel dapat ditambahkan di sini -->
      <Artikel />
    </div>

    <NavbarBottom />
  </div>
</template>
