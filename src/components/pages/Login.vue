<script setup>
import SplashScreen from "./SplashScreen.vue";
import { onMounted, ref } from "vue";

const username = ref("");
const password = ref("");
const splash = ref(true);

const handleLogin = () => {
  console.log("Username:", username.value);
  console.log("Password:", password.value);
  // Lanjutkan logika autentikasi di sini (misal ke API)
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
            v-model="username"
            type="text"
            id="username"
            placeholder="Username"
            class="w-full rounded-lg p-3 text-sm text-gray-900 bg-white shadow focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Password"
            class="w-full rounded-lg p-3 text-sm text-gray-900 bg-white shadow focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full text-xl bg-blue-800 hover:bg-blue-900 text-white rounded-lg px-5 py-3"
        >
          <router-link to="/dashboard"> Masuk </router-link>
        </button>
      </form>
      <div class="flex mt-2">
        <p>
          Belum punya akun?
          <span
            ><router-link to="/register" class="text-blue-800 hover:underline"
              >Daftar di sini</router-link
            ></span
          >
        </p>
      </div>
      <!-- <router-link to="/dashboard">Home</router-link> -->
    </div>
  </section>
</template>
