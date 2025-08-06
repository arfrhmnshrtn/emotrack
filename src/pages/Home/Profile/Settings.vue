<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-6">
    <h1 class="text-2xl font-bold text-center text-pink-600">
      Pengaturan Profil
    </h1>

    <!-- Foto Profil -->
    <div class="flex flex-col items-center space-y-2">
      <img
        :src="preview || defaultPhoto"
        alt="Foto Profil"
        class="w-24 h-24 rounded-full object-cover border"
      />
      <input
        type="file"
        accept="image/*"
        @change="handlePhoto"
        class="text-sm"
      />
    </div>

    <!-- Form Input -->
    <form @submit.prevent="saveSettings" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700"
          >Nama Lengkap</label
        >
        <input
          v-model="form.name"
          type="text"
          class="w-full border px-4 py-2 rounded-lg focus:outline-pink-500"
          placeholder="Nama Anda"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="w-full border px-4 py-2 rounded-lg focus:outline-pink-500"
          placeholder="contoh@email.com"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700"
          >HPHT (Hari Pertama Haid Terakhir)</label
        >
        <input
          v-model="form.hpht"
          type="date"
          class="w-full border px-4 py-2 rounded-lg focus:outline-pink-500"
        />
      </div>

      <!-- Tombol Simpan -->
      <button
        type="submit"
        class="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
      >
        Simpan Perubahan
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const defaultPhoto = "https://via.placeholder.com/100x100.png?text=Foto";
const preview = ref(null);

const form = ref({
  name: "",
  email: "",
  hpht: "",
  photo: null,
});

const handlePhoto = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.photo = file;
    preview.value = URL.createObjectURL(file);
  }
};

const saveSettings = () => {
  // Simulasi kirim data, bisa diganti dengan fetch/axios
  console.log("Data disimpan:", form.value);

  // TODO: Kirim ke server pakai fetch/axios + FormData
  alert("Pengaturan berhasil disimpan!");
};
</script>
