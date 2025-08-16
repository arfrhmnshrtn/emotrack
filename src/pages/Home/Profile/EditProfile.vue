<template>
  <div class="min-h-screen bg-pink-50 flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
      <!-- Foto Profil -->
      <div class="flex flex-col items-center mb-6">
        <div class="relative">
          <img
            :src="previewImage || '/default-avatar.png'"
            alt="Foto Profil"
            class="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
          />
          <!-- Tombol Edit Foto -->
          <label
            for="fileUpload"
            class="absolute bottom-0 right-0 bg-pink-500 p-2 rounded-full cursor-pointer shadow-md hover:bg-pink-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z"
              />
            </svg>
          </label>
          <input
            id="fileUpload"
            type="file"
            accept="image/*"
            class="hidden"
            @change="onFileChange"
          />
        </div>
        <p class="mt-3 text-lg font-semibold text-gray-800">
          {{ form.nama || "Nama Lengkap" }}
        </p>
        <p class="text-sm text-gray-500">@{{ form.username || "username" }}</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="saveProfile" class="space-y-5">
        <!-- Username -->
        <div>
          <label class="block text-gray-600 mb-1 text-sm">Username</label>
          <input
            v-model="form.username"
            type="text"
            placeholder="Masukkan username"
            class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
        </div>

        <!-- Nama -->
        <div>
          <label class="block text-gray-600 mb-1 text-sm">Nama Lengkap</label>
          <input
            v-model="form.nama"
            type="text"
            placeholder="Masukkan nama lengkap"
            class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
        </div>

        <!-- Tanggal Lahir -->
        <div>
          <label class="block text-gray-600 mb-1 text-sm">Tanggal Lahir</label>
          <input
            v-model="form.tanggal_lahir"
            type="date"
            class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
        </div>

        <!-- HPHT -->
        <div>
          <label class="block text-gray-600 mb-1 text-sm">
            HPHT (Hari Pertama Haid Terakhir)
          </label>
          <input
            v-model="form.hpht"
            type="date"
            class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-pink-400 focus:outline-none"
          />
        </div>

        <!-- Tombol Simpan -->
        <div class="pt-4">
          <button
            type="submit"
            class="w-full py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition font-medium text-lg shadow-md"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  username: "",
  nama: "",
  tanggal_lahir: "",
  hpht: "",
});

const previewImage = ref(null);

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    previewImage.value = URL.createObjectURL(file);
  }
};

const saveProfile = () => {
  console.log("Data yang disimpan:", form.value);
  alert("Profil berhasil diperbarui!");
};
</script>
