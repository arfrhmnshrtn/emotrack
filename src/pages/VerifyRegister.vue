<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const otp = ref("");
const loading = ref(false);
const error = ref("");
const success = ref("");
const email = ref("");
const router = useRouter();
const countdown = ref(300);
let timer = null;

// Fungsi format detik jadi MM:SS
const formatTime = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

// Ambil email dari localStorage saat komponen dimuat
onMounted(() => {
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timer);
    }
  }, 1000);
  const storedEmail = localStorage.getItem("pending_email");
  if (storedEmail) {
    email.value = storedEmail;
  } else {
    error.value = "Email tidak ditemukan. Silakan daftar ulang.";
  }
});

// Validasi OTP hanya angka 6 digit
const isValidOtp = (code) => /^\d{6}$/.test(code);

// Submit OTP
const submitCode = async () => {
  if (!otp.value) {
    error.value = "Kode tidak boleh kosong";
    return;
  }

  if (!isValidOtp(otp.value)) {
    error.value = "Kode harus 6 digit angka";
    return;
  }

  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    const response = await fetch(
      "http://localhost:3000/api/auth/verify-register-otp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.value, code: otp.value }),
      }
    );

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || "Terjadi kesalahan");

    success.value = data.message;
    localStorage.removeItem("pending_email");

    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (err) {
    error.value = err.message || "Terjadi kesalahan";
  } finally {
    loading.value = false;
  }
};

// Kirim ulang OTP
const resendOTP = async () => {
  if (!email.value) return;

  loading.value = true;
  error.value = "";
  success.value = "";

  try {
    const response = await fetch("http://localhost:3000/api/auth/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value }),
    });

    const data = await response.json();

    if (!response.ok)
      throw new Error(data.message || "Gagal mengirim ulang OTP");

    success.value = "Kode OTP telah dikirim ulang ke email Anda.";
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-pink-600 mb-4">
        Verifikasi Email
      </h2>

      <p class="text-gray-600 text-sm mb-4 text-center" v-if="email">
        Masukkan kode OTP yang telah dikirim ke email
        <span class="font-semibold">{{ email }}</span
        >.
      </p>

      <form @submit.prevent="submitCode" v-if="email">
        <input
          v-model="otp"
          type="text"
          maxlength="6"
          inputmode="numeric"
          placeholder="Masukkan kode OTP"
          class="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:ring-pink-400 text-pink-600 font-bold"
        />

        <button
          :disabled="loading"
          type="submit"
          class="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition disabled:opacity-50"
        >
          <span v-if="loading">Memverifikasi...</span>
          <span v-else>Verifikasi Kode</span>
        </button>

        <p class="text-gray-600 text-sm mt-4 text-center">
          {{ formatTime(countdown) }}
        </p>

        <button
          type="button"
          v-if="countdown === 0"
          @click="resendOTP"
          class="w-full mt-4 text-sm text-blue-600 hover:underline"
          :disabled="loading"
        >
          Kirim ulang kode OTP
        </button>

        <p v-if="error" class="text-red-500 text-sm mt-4 text-center">
          {{ error }}
        </p>
        <p v-if="success" class="text-green-500 text-sm mt-4 text-center">
          {{ success }}
        </p>
      </form>

      <p v-else class="text-center text-red-500">
        Email tidak tersedia. Silakan daftar ulang.
      </p>
    </div>
  </div>
</template>
