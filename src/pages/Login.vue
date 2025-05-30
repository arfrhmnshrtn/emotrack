<script setup>
import SplashScreen from "./SplashScreen.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const splash = ref(true);
const router = useRouter();
const errorMessage = ref("");

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = "Email dan password harus diisi.";
    return;
  }

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
      errorMessage.value = result.message;
      return;
    }

    localStorage.setItem("user", JSON.stringify(result.user));
    // alert("Login berhasil!");
    // errorMessage value = "";
    router.push("/dashboard");
  } catch (error) {
    console.error(error);
    // alert("Terjadi kesalahan saat menghubungi server.");
    errorMessage.value = "Terjadi kesalahan saat menghubungi server.";
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

        <div>
          <p class="text-sm text-red-500 italic">{{ errorMessage }}</p>
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
    </div>
  </section>
</template>
