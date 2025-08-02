<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Loading from "../components/Loading.vue";

const router = useRouter();

const username = ref("ariefraa");
const name = ref("Arief Rachman Sahertian");
const date = ref("2000-01-01"); // format: YYYY-MM-DD
const email = ref("iw8628940@gmail.com");
const password = ref("Password123!");
const confirmPassword = ref("Password123!");
const role = ref("ibu_hamil"); // atau "keluarga"
const hpht = ref("2025-06-01"); // contoh tanggal HPHT (jika role = ibu_hamil)
const acceptTerms = ref(true);

const loading = ref(false);

const handleRegister = async () => {
  loading.value = true;

  if (password.value !== confirmPassword.value) {
    alert("Password dan Konfirmasi Password tidak cocok!");
    return;
  }

  if (!acceptTerms.value) {
    alert("Anda harus menyetujui Syarat dan Ketentuan.");
    return;
  }

  const data = {
    username: username.value,
    name: name.value,
    date: date.value,
    email: email.value,
    password: password.value,
    role: role.value,
    hpht: role.value === "ibu_hamil" ? hpht.value : null,
  };

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Gagal mendaftar");
    } else {
      // alert("Registrasi berhasil!");
      localStorage.setItem("pending_email", email.value);
      router.push("/verify-register");
    }
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan saat registrasi");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="bg-white flex items-center justify-center">
    <div class="w-full p-6">
      <h1 class="text-2xl font-bold text-center text-pink-500 mb-6">
        Buat Akun
      </h1>
      <form class="space-y-4" @submit.prevent="handleRegister">
        <div>
          <label
            for="username"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            v-model="username"
            type="text"
            id="username"
            required
            class="w-full shadow rounded-lg p-2.5 text-sm text-gray-900"
            placeholder="Masukan Username"
          />
        </div>

        <div>
          <label for="nama" class="block mb-1 text-sm font-medium text-gray-700"
            >Nama</label
          >
          <input
            v-model="name"
            type="text"
            id="nama"
            required
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow"
            placeholder="Masukan Nama"
          />
        </div>

        <div>
          <label
            for="tanggal-lahir"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Tanggal Lahir</label
          >
          <input
            v-model="date"
            type="date"
            id="tanggal-lahir"
            required
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow"
          />
        </div>

        <div>
          <label
            for="status-akun"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Status Akun</label
          >
          <select
            v-model="role"
            id="status-akun"
            required
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow"
          >
            <option disabled value="">Pilih Status Akun</option>
            <option value="ibu_hamil">Ibu Hamil</option>
            <option value="keluarga">Keluarga</option>
          </select>
        </div>

        <div v-if="role === 'ibu_hamil'">
          <label for="hpht" class="block mb-1 text-sm font-medium text-gray-700"
            >Hari Pertama Haid Terakhir (HPHT)</label
          >
          <input
            v-model="hpht"
            type="date"
            id="hpht"
            required
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow"
          />
        </div>

        <div>
          <label
            for="email"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow"
            placeholder="name@company.com"
          />
        </div>

        <div>
          <label
            for="password"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label
            for="confirm-password"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Konfirmasi Password</label
          >
          <input
            v-model="confirmPassword"
            type="password"
            id="confirm-password"
            required
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow"
            placeholder="••••••••"
          />
        </div>

        <div class="flex items-center">
          <input
            v-model="acceptTerms"
            id="terms"
            type="checkbox"
            class="w-4 h-4 text-pink-500 bg-gray-100 border-gray-300 rounded"
            required
          />
          <label for="terms" class="ml-2 text-sm text-gray-600">
            Saya menerima
            <a href="#" class="text-pink-500 hover:underline"
              >Syarat dan Ketentuan</a
            >
          </label>
        </div>

        <button
          type="submit"
          class="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg px-5 py-2.5 text-sm"
        >
          Buat Akun
        </button>

        <p class="text-sm text-center text-gray-600">
          Sudah punya akun?
          <router-link to="/" class="text-pink-500 hover:underline"
            >Login di sini</router-link
          >
        </p>
      </form>
      <Loading v-if="loading" />
    </div>
  </section>
</template>
