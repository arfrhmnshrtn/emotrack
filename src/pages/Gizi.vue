<script setup>
import { ref, reactive } from "vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Daftar jenis makanan
const makanan = reactive([
  { nama: "Karbohidrat", jumlah: "" },
  { nama: "Protein Hewani", jumlah: "" },
  { nama: "Protein Nabati", jumlah: "" },
  { nama: "Sayuran", jumlah: "" },
  { nama: "Buah", jumlah: "" },
  { nama: "Minyak / Lemak", jumlah: "" },
  { nama: "Gula", jumlah: "" },
]);

const showModal = ref(false);

const simpanData = () => {
  console.log("Data yang disimpan:", makanan);
  showModal.value = true;
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <div
    class="max-w-xl mx-auto p-6 bg-white rounded-xl space-y-6 shadow-sm min-h-screen"
  >
    <!-- Header -->
    <div class="flex items-center gap-3">
      <Icon
        icon="mdi:arrow-left"
        class="w-6 h-6 cursor-pointer text-gray-700"
        @click="goBack"
      />
      <h2 class="text-xl font-semibold text-gray-800">Form Gizi Ibu Hamil</h2>
    </div>

    <!-- Input Form -->
    <div v-for="(item, index) in makanan" :key="index">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        {{ item.nama }}
      </label>
      <input
        v-model.number="item.jumlah"
        type="number"
        min="0"
        placeholder="Jumlah porsi"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
      />
    </div>

    <!-- Tombol Simpan -->
    <div class="text-right">
      <button
        @click="simpanData"
        class="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
      >
        Simpan Data
      </button>
    </div>

    <!-- Modal Pop Up -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
    >
      <div class="bg-white shadow-xl p-6 rounded-lg space-y-4 text-center w-72">
        <h3 class="text-lg font-semibold text-gray-800">Selesai</h3>
        <p class="text-gray-600">Data berhasil disimpan!</p>
        <button
          @click="showModal = false"
          class="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>
