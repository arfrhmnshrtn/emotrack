<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const newPassword = ref("");
const showPassword = ref(false);
const loading = ref(false);
const email = ref("");
const code = ref("");
const error = ref("");
const router = useRouter();
const showModal = ref(false);

const submitNewPassword = async () => {
  if (!newPassword.value) {
    error.value = "Password tidak boleh kosong.";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    const response = await fetch(
      "http://202.10.35.143:3000/api/auth/reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.value,
          code: code.value,
          newPassword: newPassword.value,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Terjadi kesalahan");

    localStorage.removeItem("pending_email");
    localStorage.removeItem("reset_code");

    showModal.value = true;
    // router.push("/");
  } catch (err) {
    error.value = err.message || "Terjadi kesalahan saat mengubah password.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  const storedEmail = localStorage.getItem("pending_email");
  const storedCode = localStorage.getItem("reset_code");

  if (storedEmail && storedCode) {
    email.value = storedEmail;
    code.value = storedCode;
  } else {
    router.push("/forget-password");
  }
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-pink-50 px-4">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg font-sans">
      <h1 class="text-2xl font-bold text-center text-pink-600 mb-2">
        Buat Password Baru
      </h1>
      <p class="text-sm text-center text-gray-500 mb-6">
        Masukkan password baru untuk mengatur ulang akun Anda.
      </p>

      <form @submit.prevent="submitNewPassword">
        <!-- Input Password -->
        <div class="relative mb-4">
          <input
            v-model="newPassword"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            placeholder="Password Baru"
            class="w-full rounded-lg p-3 text-sm text-gray-900 bg-white border border-gray-300 shadow focus:ring-pink-500 focus:border-pink-500 focus:outline-none"
            :class="{ 'border-red-500': error }"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-3 text-gray-600"
          >
            <svg
              v-if="!showPassword"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"
              />
            </svg>
          </button>
        </div>

        <!-- Error Message -->
        <p v-if="error" class="text-sm text-red-500 mb-4">{{ error }}</p>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-medium shadow transition"
        >
          <span v-if="!loading">Simpan Password Baru</span>
          <span v-else>Memproses...</span>
        </button>
      </form>
    </div>

    <!-- modal -->
    <div
      class="fixed inset-0 flex bg-opacity-50 items-center justify-center z-50"
      v-if="showModal"
    >
      <div
        class="bg-white w-11/12 max-w-sm p-6 rounded-2xl shadow-xl text-center"
      >
        <svg
          class="mx-auto mb-4 text-pink-500"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2m5 8l-5.5 5.5L7 11l1.4-1.4l3.1 3.1L15.6 8z"
          />
        </svg>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">
          Password Berhasil Diubah
        </h2>
        <p class="text-sm text-gray-500 mb-6">
          Silakan login dengan password baru Anda.
        </p>
        <button
          @click="router.push('/')"
          class="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg shadow transition"
        >
          Oke
        </button>
      </div>
    </div>
  </div>
</template>
