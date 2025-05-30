<script setup>
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currentName = route.name;

const isActive = (name) => currentName === name;
</script>

<template>
  <div
    class="fixed bottom-0 left-0 right-0 bg-white shadow-md rounded-t-2xl px-6 py-3 flex justify-between items-center z-50"
  >
    <!-- Home -->
    <div
      :class="[
        'flex flex-col items-center',
        isActive('Home') ? 'text-pink-500' : 'text-gray-500',
      ]"
    >
      <router-link to="/dashboard">
        <Icon icon="mdi:home" class="w-6 h-6" />
        <span class="text-xs">Home</span>
      </router-link>
    </div>

    <!-- artikel -->
    <router-link
      to="/artikel"
      :class="[
        'flex flex-col items-center',
        isActive('Artikel') ? 'text-pink-500' : 'text-gray-500',
      ]"
    >
      <Icon icon="bi:book" class="w-6 h-6" />
      <span class="text-xs">Artikel</span>
    </router-link>

    <!-- Floating Center Button (tanpa route) -->
    <router-link
      to="/chatbot"
      class="relative -mt-10 bg-pink-500 rounded-full p-4 shadow-lg"
    >
      <Icon icon="mdi:chat" class="w-6 h-6 text-white" />
    </router-link>

    <!-- grafik -->
    <router-link
      to="/grafik"
      :class="[
        'flex flex-col items-center',
        isActive('Grafik') ? 'text-pink-500' : 'text-gray-500',
      ]"
    >
      <Icon icon="mdi:chart-line" class="w-6 h-6" />
      <span class="text-xs">Grafik</span>
    </router-link>

    <!-- Profile -->
    <router-link
      to="/profile"
      :class="[
        'flex flex-col items-center',
        isActive('Profile') ? 'text-pink-500' : 'text-gray-500',
      ]"
    >
      <Icon icon="mdi:account" class="w-6 h-6" />
      <span class="text-xs">Profile</span>
    </router-link>
  </div>
</template>
