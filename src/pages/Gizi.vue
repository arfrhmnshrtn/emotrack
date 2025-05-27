<template>
  <div class="max-w-xl mx-auto p-6 bg-white rounded-xl  space-y-6">
    <h2 class="text-xl font-semibold text-gray-800">Form Gizi Ibu Hamil</h2>

    <!-- Nama -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Nama Ibu</label
      >
      <input
        type="text"
        placeholder="Masukkan nama lengkap"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Usia Kehamilan -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Usia Kehamilan (minggu)</label
      >
      <input
        type="number"
        min="1"
        max="42"
        placeholder="Contoh: 20"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Berat Badan -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Berat Badan (kg)</label
      >
      <input
        type="number"
        step="0.1"
        placeholder="Contoh: 60.5"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Tinggi Badan -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Tinggi Badan (cm)</label
      >
      <input
        type="number"
        placeholder="Contoh: 160"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Asupan Nutrisi -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1"
        >Asupan Kalori Harian (kkal)</label
      >
      <input
        type="number"
        placeholder="Contoh: 2200"
        class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Tombol Submit -->
    <div class="text-right">
      <button
        class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Simpan Data
      </button>
    </div>
  </div>
</template>
