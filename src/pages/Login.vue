<script setup>
import SplashScreen from "./SplashScreen.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";

const email = ref("");
const password = ref("");
const splash = ref(true);
const router = useRouter();
const errors = ref({
  email: "",
  password: "",
  general: "",
});

// 🔐 Validasi form login manual
const validateForm = () => {
  let isValid = true;
  errors.value = {
    email: "",
    password: "",
    general: "",
  };

  if (!email.value) {
    errors.value.email = "Email harus diisi";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.value.email = "Format email tidak valid";
    isValid = false;
  }

  if (!password.value) {
    errors.value.password = "Password harus diisi";
    isValid = false;
  } else if (password.value.length < 6) {
    errors.value.password = "Password minimal 6 karakter";
    isValid = false;
  }

  return isValid;
};

// 🧠 Login Manual
const handleLogin = async () => {
  if (!validateForm()) return;

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // penting jika backend pakai session
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
  }
};

// 🌀 Splash logic
function showSplash() {
  setTimeout(() => {
    splash.value = false;
  }, 1000);
}

// 🔍 Ambil user login Google saat masuk dari redirect
onMounted(async () => {
  showSplash();

  try {
    const res = await fetch("http://localhost:3000/api/auth/profile", {
      credentials: "include",
    });

    if (res.ok) {
      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
      userName.value = user.name || "";
    } else {
      // Session tidak valid, bisa arahkan ke login
      localStorage.removeItem("user");
      router.push("/login");
    }
  } catch (error) {
    console.error("Gagal ambil data user dari session:", error);
  }
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

        <div>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="Password"
            class="w-full rounded-lg p-3 text-sm text-gray-900 bg-white shadow focus:ring-blue-500 focus:border-blue-500"
            :class="{ 'border-red-500': errors.password }"
          />
          <p v-if="errors.password" class="text-sm text-red-500 mt-1">
            {{ errors.password }}
          </p>
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
          <router-link to="/register" class="text-pink-500 hover:underline">
            Daftar di sini
          </router-link>
        </p>
      </div>

      <div class="mt-10">
        <a
          href="http://localhost:3000/api/auth/google"
          class="text-m bg-gray-300 hover:bg-gray-200 text-gray-800 rounded-lg py-2 flex justify-center gap-2 items-center"
        >
          <Icon icon="flat-color-icons:google" class="w-6 h-6" />
          <span>Login via Google</span>
        </a>
      </div>
    </div>
  </section>
</template>
