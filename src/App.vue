<script setup>
import { onMounted } from "vue";
import { App } from "@capacitor/app";
import { useRouter } from "vue-router";
import Home from "./layout/Home.vue";

const router = useRouter();

onMounted(() => {
  App.addListener("backButton", () => {
    if (router.currentRoute.value.path !== "/dashboard") {
      router.back();
    } else {
      App.exitApp();
    }
  });
});
</script>

<template>
  <Home />
</template>
