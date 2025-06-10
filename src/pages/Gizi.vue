<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded-xl space-y-6">
    <!-- Header dengan Icon Back -->
    <div class="flex items-center space-x-2">
      <button @click="goBack" class="text-gray-600 hover:text-gray-800">
        <!-- Icon Back -->
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
      <h2 class="text-xl font-semibold text-gray-800">Form Gizi Ibu Hamil</h2>
    </div>

    <!-- Input Gizi per Jenis Makanan -->
    <div v-for="(item, index) in makanan" :key="index">
      <label class="block text-sm font-medium text-gray-700 mb-1">{{
        item.nama
      }}</label>
      <input
        v-model="item.jumlah"
        type="number"
        min="0"
        placeholder="Jumlah porsi"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Tombol Submit -->
    <div class="text-right">
      <button
        @click="simpanData"
        class="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-700 transition"
      >
        Simpan Data
      </button>
    </div>

    <!-- Pop Up Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 shadow-2xl bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white shadow-2xl p-6 rounded-lg space-y-4 text-center">
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

<script>
export default {
  data() {
    return {
      makanan: [
        { nama: "Karbohidrat", jumlah: "" },
        { nama: "Protein Hewani", jumlah: "" },
        { nama: "Protein Nabati", jumlah: "" },
        { nama: "Sayuran", jumlah: "" },
        { nama: "Buah", jumlah: "" },
        { nama: "Minyak / Lemak", jumlah: "" },
        { nama: "Gula", jumlah: "" },
      ],
      showModal: false, // Untuk mengontrol pop up
    };
  },
  methods: {
    simpanData() {
      console.log("Data yang disimpan:", this.makanan);
      this.showModal = true; // Tampilkan pop up
    },
    goBack() {
      window.history.back();
    },
  },
};
</script>
