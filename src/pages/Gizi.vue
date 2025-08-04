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

const waktu = reactive([
  {
    nama: "Pagi",
    waktu: "07:00 - 09:00",
  },
  {
    nama: "Siang",
    waktu: "12:00 - 14:00",
  },
  {
    nama: "Sore",
    waktu: "17:00 - 19:00",
  },
  {
    nama: "Malam",
    waktu: "20:00 - 22:00",
  },
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
    class="max-w-xl mx-auto p-4 bg-white rounded-xl space-y-6 shadow-sm min-h-screen"
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
    <div class="max-w-md mx-auto bg-white p-6 rounded-2xl space-y-4">
      <form>
        <!-- Tanggal -->
        <div class="space-y-1">
          <label for="tanggal" class="block text-gray-700 font-medium"
            >Tanggal</label
          >
          <input
            type="date"
            name="tanggal"
            id="tanggal"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <!-- berat badan -->
        <div class="space-y-1 mt-5">
          <label for="berat-badan" class="block text-gray-700 font-medium"
            >Berat Badan (kg)</label
          >
          <input
            type="number"
            name="berat-badan"
            id="berat-badan"
            placeholder="Masukkan berat badan"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <!-- Waktu -->
        <div class="space-y-1 mt-5">
          <label for="jenis-makanan" class="block text-gray-700 font-medium"
            >Waktu</label
          >
          <select
            name="jenis-makanan"
            id="jenis-makanan"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="" disabled selected>-- Pilih Waktu --</option>
            <option v-for="item in waktu" :key="item.nama" :value="item.nama">
              {{ item.nama }}
            </option>
          </select>
        </div>

        <!-- jumlah -->
        <div class="space-y-1 mt-5">
          <label for="jumlah" class="block text-gray-700 font-medium"
            >Jumlah</label
          >
          <input
            type="number"
            name="jumlah"
            id="jumlah"
            placeholder="Masukkan jumlah (dalam gram)"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <!-- satuan -->
        <div class="space-y-1 mt-5">
          <label for="satuan" class="block text-gray-700 font-medium"
            >Satuan</label
          >
          <select
            name="satuan"
            id="satuan"
            class="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="" disabled selected>-- Pilih Satuan --</option>
            <option value="gram">Gram</option>
            <option value="piring">Piring</option>
            <option value="sendok">Sendok</option>
            <option value="gelas">Gelas</option>
            <option value="buah">Buah</option>
            <option value="porsi">Porsi</option>
          </select>
        </div>

        <!-- Makanan -->
        <div class="space-y-1 mt-5">
          <label for="makanan" class="block text-gray-700 font-medium"
            >Makanan/Minuman</label
          >
          <textarea
            type="text"
            name="makanan"
            id="makanan"
            placeholder="Masukkan makanan"
            class="w-full h-32 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <!-- Tombol Simpan -->
        <div class="text-right pt-2">
          <button
            type="submit"
            class="bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-600 transition duration-200"
          >
            Simpan
          </button>
        </div>
      </form>

      <button>
        <router-link to="/viewgizi" class="text-blue-600 hover:underline">
          Lihat Gizi
        </router-link>
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
