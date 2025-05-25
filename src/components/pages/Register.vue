<template>
  <section class="bg-white flex items-center justify-center">
    <div class="w-full p-6">
      <h1 class="text-2xl font-bold text-center text-gray-900 mb-6">
        Buat Akun
      </h1>
      <form class="space-y-4">
        <div>
          <label
            for="username"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Username</label
          >
          <input
            type="text"
            id="username"
            class="w-full shadow rounded-lg p-2.5 text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukan Username"
            required
          />
        </div>

        <div>
          <label for="nama" class="block mb-1 text-sm font-medium text-gray-700"
            >Nama</label
          >
          <input
            type="text"
            id="nama"
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow focus:ring-blue-500 focus:border-blue-500"
            placeholder="Masukan Nama"
            required
          />
        </div>

        <div>
          <label
            for="tanggal-lahir"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Tanggal Lahir</label
          >
          <input
            type="date"
            id="tanggal-lahir"
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            for="status-akun"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Status Akun</label
          >
          <select
            id="status-akun"
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option disabled selected value="">Pilih Status Akun</option>
            <option value="user">Ibu Hamil</option>
            <option value="admin">Keluarga</option>
          </select>
        </div>

        <div>
          <label for="hpht" class="block mb-1 text-sm font-medium text-gray-700"
            >Hari Pertama Haid Terakhir (HPHT)</label
          >
          <input
            type="date"
            id="hpht"
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            for="email"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="email"
            id="email"
            placeholder="name@company.com"
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            for="password"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Password</label
          >
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label
            for="confirm-password"
            class="block mb-1 text-sm font-medium text-gray-700"
            >Konfirmasi Password</label
          >
          <input
            type="password"
            id="confirm-password"
            placeholder="••••••••"
            class="w-full rounded-lg p-2.5 text-sm text-gray-900 shadow focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div class="flex items-center">
          <input
            id="terms"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            required
          />
          <label for="terms" class="ml-2 text-sm text-gray-600">
            Saya menerima
            <a href="#" class="text-blue-600 hover:underline"
              >Syarat dan Ketentuan</a
            >
          </label>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-5 py-2.5 text-sm"
        >
          Buat Akun
        </button>

        <p class="text-sm text-center text-gray-600">
          Sudah punya akun?
          <router-link to="/" class="text-blue-600 hover:underline"
            >Login di sini</router-link
          >
        </p>
      </form>
    </div>
  </section>
</template>
