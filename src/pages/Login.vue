<script setup>
import SplashScreen from "./SplashScreen.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Loading from "../components/Loading.vue";
// import { Icon } from "@iconify/vue";

const showPassword = ref(false);
const email = ref("");
const password = ref("");
const splash = ref(true);
const router = useRouter();
const loading = ref(false);
const errors = ref({
  email: "",
  password: "",
  general: "",
});

const validateForm = () => {
  let isValid = true;

  // Reset errors
  errors.value = {
    email: "",
    password: "",
    general: "",
  };

  // Email validation
  if (!email.value) {
    errors.value.email = "Email harus diisi";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.value.email = "Format email tidak valid";
    isValid = false;
  }

  // Password validation
  if (!password.value) {
    errors.value.password = "Password harus diisi";
    isValid = false;
  } else if (password.value.length < 6) {
    errors.value.password = "Password minimal 6 karakter";
    isValid = false;
  }

  return isValid;
};

const handleLogin = async () => {
  if (!validateForm()) return;
  loading.value = true;

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      errors.value.general = result.message || "Login gagal";
      return;
    }

    localStorage.setItem("user", JSON.stringify(result.user));
    router.push("/dashboard");
  } catch (error) {
    console.error(error);
    errors.value.general = "Terjadi kesalahan saat menghubungi server.";
  } finally {
    loading.value = false;
  }
};

function showSplash() {
  setTimeout(() => {
    splash.value = false;
  }, 1000);
}

onMounted(() => {
  showSplash();
});
</script>

<template>
  <SplashScreen v-if="splash" />
  <section
    class="min-h-screen flex items-center justify-center bg-white px-4"
    v-else
  >
    <div class="w-full max-w-sm p-6">
      <h1 class="text-2xl text-center text-gray-900 mb-6">
        Masuk ke akun Anda
      </h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="Email"
            class="w-full rounded-lg p-3 text-sm text-gray-900 bg-white shadow focus:ring-blue-500 focus:border-blue-500"
            :class="{ 'border-red-500': errors.email }"
          />
          <p v-if="errors.email" class="text-sm text-red-500 mt-1">
            {{ errors.email }}
          </p>
        </div>

        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            placeholder="Password"
            class="w-full rounded-lg p-3 text-sm text-gray-900 bg-white shadow focus:ring-blue-500 focus:border-blue-500"
            :class="{ 'border-red-500': errors.password }"
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
              viewBox="0 0 24 24"
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
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"
              />
            </svg>
          </button>

          <p v-if="errors.password" class="text-sm text-red-500 mt-1">
            {{ errors.password }}
          </p>
        </div>

        <div>
          <router-link to="/forget-password" class="text-sm text-pink-500 ml-1"
            >Lupa password?</router-link
          >
        </div>

        <div v-if="errors.general">
          <p class="text-sm text-red-500 italic">{{ errors.general }}</p>
        </div>

        <button
          type="submit"
          class="w-full text-xl bg-pink-500 hover:bg-pink-600 cursor-pointer text-white rounded-lg px-5 py-3"
        >
          Masuk
        </button>
      </form>
      <div class="flex mt-2">
        <p>
          Belum punya akun?
          <span>
            <router-link to="/register" class="text-pink-500 hover:underline">
              Daftar di sini
            </router-link>
          </span>
        </p>
      </div>
      <Loading v-if="loading" />
    </div>
  </section>
</template>
