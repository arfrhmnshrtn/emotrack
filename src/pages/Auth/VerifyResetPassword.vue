<script setup>
import { ref, nextTick, onMounted } from "vue";
import { useRouter } from "vue-router";
import Loading from "../../components/Loading.vue";

const otp = ref(["", "", "", "", "", ""]);
const otpInputs = ref([]);
const email = ref("");
const loading = ref(false);

const router = useRouter();

const onInput = (index) => {
  if (otp.value[index].length > 1) {
    otp.value[index] = otp.value[index].slice(0, 1);
  }

  if (otp.value[index] !== "" && index < otp.value.length - 1) {
    nextTick(() => {
      otpInputs.value[index + 1]?.focus();
    });
  }
};

const onBackspace = (index) => {
  if (otp.value[index] === "" && index > 0) {
    nextTick(() => {
      otpInputs.value[index - 1]?.focus();
    });
  }
};

const submitOtp = async () => {
  loading.value = true;
  const code = otp.value.join("");
  try {
    const response = await fetch(
      "http://202.10.35.143:3000/api/auth/verify-reset-code",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.value, code: code }),
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Terjadi kesalahan");
    localStorage.setItem("reset_code", code);
    router.push("/input-new-password");
  } catch (error) {
    console.error("Error verifying OTP:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  const storedEmail = localStorage.getItem("pending_email");
  if (storedEmail) {
    email.value = storedEmail;
  } else {
    alert("Email tidak ditemukan. Silakan daftar ulang.");
  }
});
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-white p-4"
  >
    <h1 class="text-2xl font-semibold mb-4 text-gray-800">Verifikasi Kode</h1>
    <p class="mb-6 text-gray-600 text-sm text-center">
      Masukkan 6 digit kode yang dikirim ke email Anda
    </p>

    <div class="flex gap-2 mb-6">
      <input
        v-for="(digit, index) in otp"
        :key="index"
        ref="otpInputs"
        v-model="otp[index]"
        maxlength="1"
        type="number"
        inputmode="numeric"
        pattern="[0-9]*"
        class="w-12 h-14 text-center text-lg border rounded-md shadow-sm ring-pink-600 focus:ring-2 focus:ring-pink-500 focus:outline-none bg-white"
        @input="onInput(index)"
        @keydown.backspace="onBackspace(index)"
      />
    </div>

    <button
      @click="submitOtp"
      class="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md shadow text-sm"
    >
      Verifikasi
    </button>
    <Loading v-if="loading" class="mt-4" />
  </div>
</template>
