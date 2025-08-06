<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Loading from "../../components/Loading.vue";

const router = useRouter();
const email = ref("");
const loading = ref(false);
const error = ref("");
const success = ref("");

const submit = async () => {
  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    const response = await fetch(
      "http://localhost:3000/api/auth/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.value }),
      }
    );

    const result = await response.json();

    if (!response.ok) throw new Error(result.message || "Gagal mengirim kode");

    success.value = "Kode OTP telah dikirim ke email Anda.";
    localStorage.setItem("pending_email", email.value);
    router.push("/verify-reset-password");
  } catch (err) {
    error.value = err.message || "Terjadi kesalahan";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-sm p-6">
      <h1 class="text-2xl font-bold text-center text-pink-500 mb-2">
        Lupa Password
      </h1>
      <p class="text-sm text-gray-600 text-center mb-6">
        Masukkan email Anda untuk menerima kode reset password.
      </p>

      <form @submit.prevent="submit">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          required
        />

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 rounded-md transition disabled:opacity-50"
        >
          {{ loading ? "Mengirim..." : "Kirim Kode" }}
        </button>

        <p v-if="error" class="text-red-500 text-sm mt-4 text-center">
          {{ error }}
        </p>
        <p v-if="success" class="text-green-500 text-sm mt-4 text-center">
          {{ success }}
        </p>
      </form>

      <div class="mt-6 text-sm text-center text-gray-600">
        Ingat password?
        <router-link to="/login" class="text-pink-500 hover:underline"
          >Masuk</router-link
        >
      </div>
    </div>

    <Loading v-if="loading" />
  </div>
</template>

<style scoped>
/* Tambahan opsional jika ingin smooth animation */
input,
button {
  transition: all 0.2s ease;
}
</style>
