<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Loading from "../../components/Loading.vue";

// Constants
const API_URL = "http://202.10.35.143:3000/api/auth/register";

// Refs
const router = useRouter();
const loading = ref(false);
const errorText = ref("");

// Form fields
const formData = ref({
  username: "",
  name: "",
  date: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
  hpht: "",
  acceptTerms: true,
});

// Validation rules
const validationRules = {
  username: (value) => !!value || "Username harus diisi",
  name: (value) => !!value || "Nama harus diisi",
  date: (value) => !!value || "Tanggal lahir harus diisi",
  email: (value) => {
    if (!value) return "Email harus diisi";
    if (!/^\S+@\S+\.\S+$/.test(value)) return "Format email tidak valid";
    return true;
  },
  password: (value) => {
    if (!value) return "Password harus diisi";
    if (value.length < 6) return "Password minimal 6 karakter";
    return true;
  },
  confirmPassword: (value, { password }) => {
    if (!value) return "Konfirmasi password harus diisi";
    if (value !== password) return "Password tidak cocok";
    return true;
  },
  role: (value) => !!value || "Status akun harus dipilih",
  hpht: (value, { role }) => {
    if (role === "ibu_hamil" && !value) return "HPHT harus diisi";
    return true;
  },
  acceptTerms: (value) => value || "Anda harus menyetujui syarat dan ketentuan",
};

// Validate form
const validateForm = () => {
  errorText.value = "";
  let isValid = true;

  for (const [field, rule] of Object.entries(validationRules)) {
    const value = formData.value[field];
    const result =
      typeof rule === "function" ? rule(value, formData.value) : rule;

    if (result !== true) {
      errorText.value = result;
      isValid = false;
      break;
    }
  }

  return isValid;
};

// Handle registration
const handleRegister = async () => {
  if (!validateForm()) return;
  if (!formData.value.acceptTerms) {
    errorText.value = "Anda harus menyetujui syarat dan ketentuan";
    return;
  }

  loading.value = true;

  try {
    const payload = {
      username: formData.value.username,
      name: formData.value.name,
      date: formData.value.date,
      email: formData.value.email,
      password: formData.value.password,
      role: formData.value.role,
      hpht: formData.value.role === "ibu_hamil" ? formData.value.hpht : null,
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Gagal mendaftar");
    }

    localStorage.setItem("pending_email", formData.value.email);
    router.push("/verify-register");
  } catch (error) {
    errorText.value = error.message;
    console.error("Registration error:", error);
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
        <!-- Username Field -->
        <div>
          <label
            for="username"
            class="block mb-1 text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            v-model="formData.username"
            type="text"
            id="username"
            required
            class="w-full shadow rounded-lg p-2.5 text-sm text-gray-900"
            placeholder="Masukan Username"
          />
        </div>

        <!-- Name Field -->
        <div>
          <label
            for="nama"
            class="block mb-1 text-sm font-medium text-gray-700"
          >
            Nama
          </label>
          <input
            v-model="formData.name"
            type="text"
            id="nama"
            required
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow"
            placeholder="Masukan Nama"
          />
        </div>

        <!-- Date of Birth Field -->
        <div>
          <label
            for="tanggal-lahir"
            class="block mb-1 text-sm font-medium text-gray-700"
          >
            Tanggal Lahir
          </label>
          <input
            v-model="formData.date"
            type="date"
            id="tanggal-lahir"
            required
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow"
          />
        </div>

        <!-- Account Status Field -->
        <div>
          <label
            for="status-akun"
            class="block mb-1 text-sm font-medium text-gray-700"
          >
            Status Akun
          </label>
          <select
            v-model="formData.role"
            id="status-akun"
            required
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow"
          >
            <option disabled value="">Pilih Status Akun</option>
            <option value="ibu_hamil">Ibu Hamil</option>
            <option value="keluarga">Keluarga</option>
          </select>
        </div>

        <!-- HPHT Field (Conditional) -->
        <div v-if="formData.role === 'ibu_hamil'">
          <label
            for="hpht"
            class="block mb-1 text-sm font-medium text-gray-700"
          >
            Hari Pertama Haid Terakhir (HPHT)
          </label>
          <input
            v-model="formData.hpht"
            type="date"
            id="hpht"
            :required="formData.role === 'ibu_hamil'"
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow"
          />
        </div>

        <!-- Email Field -->
        <div>
          <label
            for="email"
            class="block mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            v-model="formData.email"
            type="email"
            id="email"
            required
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow"
            placeholder="name@company.com"
          />
        </div>

        <!-- Password Field -->
        <div>
          <label
            for="password"
            class="block mb-1 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            v-model="formData.password"
            type="password"
            id="password"
            required
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow"
            placeholder="••••••••"
          />
        </div>

        <!-- Confirm Password Field -->
        <div>
          <label
            for="confirm-password"
            class="block mb-1 text-sm font-medium text-gray-700"
          >
            Konfirmasi Password
          </label>
          <input
            v-model="formData.confirmPassword"
            type="password"
            id="confirm-password"
            required
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow"
            placeholder="••••••••"
          />
        </div>

        <!-- Terms Checkbox -->
        <div class="flex items-center">
          <input
            v-model="formData.acceptTerms"
            id="terms"
            type="checkbox"
            class="w-4 h-4 text-pink-500 bg-gray-100 border-gray-300 rounded"
            required
          />
          <label for="terms" class="ml-2 text-sm text-gray-600">
            Saya menerima
            <a href="#" class="text-pink-500 hover:underline">
              Syarat dan Ketentuan
            </a>
          </label>
        </div>

        <!-- Error Message -->
        <p
          v-if="errorText"
          class="text-red-500 text-sm mt-2 text-center animate-bounce"
        >
          {{ errorText }}
        </p>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg px-5 py-2.5 text-sm"
        >
          Buat Akun
        </button>

        <!-- Login Link -->
        <p class="text-sm text-center text-gray-600">
          Sudah punya akun?
          <router-link to="/" class="text-pink-500 hover:underline">
            Login di sini
          </router-link>
        </p>
      </form>
      <Loading v-if="loading" />
    </div>
  </section>
</template>
