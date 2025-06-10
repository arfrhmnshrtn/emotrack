<script setup>
import ChartBar from "../components/ChartBar.vue";
import NavbarBottom from "../components/NavbarBottom.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between bg-white">
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4 text-center text-pink-600">
        Halaman Grafik
      </h1>
      <ChartBar />
    </div>
    <NavbarBottom />
  </div>
</template>
