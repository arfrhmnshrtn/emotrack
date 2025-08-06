<script setup>
import NavbarBottom from "../../../components/NavbarBottom.vue";

const articles = [
  {
    id: 1,
    title: "Tanda-Tanda Awal Kehamilan yang Perlu Diketahui",
    excerpt:
      "Mengenali tanda awal kehamilan penting untuk mempersiapkan diri secara fisik dan mental.",
    image:
      "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/06/05152418/Catat-Ini-X-Buah-yang-Bagus-untuk-Ibu-Hamil-01.jpg",
  },
  {
    id: 2,
    title: "Nutrisi Wajib untuk Ibu Hamil Trimester Pertama",
    excerpt:
      "Asupan gizi pada trimester awal sangat berpengaruh terhadap perkembangan janin.",
    image:
      "https://kehamilansehat.com/wp-content/uploads/2023/11/ibu-hamil-stres-dan-menangis.jpg",
  },
  {
    id: 3,
    title: "Daftar Pemeriksaan Kehamilan yang Harus Dilakukan",
    excerpt:
      "Pemeriksaan rutin penting untuk memantau kesehatan ibu dan janin selama kehamilan.",
    image:
      "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/06/05152418/Catat-Ini-X-Buah-yang-Bagus-untuk-Ibu-Hamil-01.jpg",
  },
  {
    id: 4,
    title: "Tips Mengatasi Mual dan Muntah Saat Hamil",
    excerpt:
      "Morning sickness bisa dikurangi dengan beberapa cara alami dan pola makan tepat.",
    image:
      "https://kehamilansehat.com/wp-content/uploads/2023/11/ibu-hamil-stres-dan-menangis.jpg",
  },
  {
    id: 5,
    title: "Olahraga Ringan yang Aman untuk Ibu Hamil",
    excerpt:
      "Beberapa jenis olahraga ringan dapat membantu memperkuat tubuh ibu hamil.",
    image:
      "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2022/06/05152418/Catat-Ini-X-Buah-yang-Bagus-untuk-Ibu-Hamil-01.jpg",
  },
];
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between bg-gray-50">
    <!-- Header -->
    <div class="p-6 mb-5">
      <h1 class="text-2xl font-bold mb-6 text-pink-600 text-center">
        Artikel Seputar Kehamilan
      </h1>

      <!-- Grid Artikel -->
      <router-link to="/detailartikel">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="article in articles"
            :key="article.id"
            class="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
          >
            <img
              :src="article.image"
              :alt="article.title"
              class="w-full h-52 object-cover rounded-t-2xl"
            />
            <div class="p-4 space-y-2">
              <h2
                class="text-lg font-semibold text-gray-800 line-clamp-2 hover:text-pink-600 transition-colors"
              >
                {{ article.title }}
              </h2>
              <p class="text-gray-500 text-sm line-clamp-3">
                {{ article.excerpt }}
              </p>
            </div>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Footer -->
    <NavbarBottom />
  </div>
</template>
