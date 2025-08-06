<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { Bar } from "vue-chartjs";

// Registrasi komponen ChartJS
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// Data Grafik Mood Ibu Hamil
const moodData = {
  labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
  datasets: [
    {
      label: "Senang",
      backgroundColor: "#34d399",
      data: [100, 100, 100, 200],
    },
    {
      label: "Baik",
      backgroundColor: "#60a5fa",
      data: [200, 22, 19, 25],
    },
    {
      label: "Biasa",
      backgroundColor: "#facc15",
      data: [10, 9, 15, 8],
    },
    {
      label: "Sedih",
      backgroundColor: "#f87171",
      data: [5, 4, 3, 2],
    },
    {
      label: "Marah",
      backgroundColor: "#a78bfa",
      data: [2, 1, 1, 0],
    },
  ],
};

// Opsi Grafik Mood
const moodOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Grafik Mood Ibu Hamil Selama 1 Bulan",
    },
  },
};

// Data Grafik Asupan Gizi
const nutritionData = {
  labels: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4"],
  datasets: [
    {
      label: "Buah",
      backgroundColor: "#fb923c",
      data: [10, 12, 11, 14],
    },
    {
      label: "Sayur",
      backgroundColor: "#34d399",
      data: [15, 14, 16, 18],
    },
    {
      label: "Karbohidrat",
      backgroundColor: "#60a5fa",
      data: [20, 22, 21, 23],
    },
    {
      label: "Protein",
      backgroundColor: "#f87171",
      data: [12, 14, 13, 15],
    },
    {
      label: "Susu",
      backgroundColor: "#a78bfa",
      data: [8, 9, 10, 11],
    },
  ],
};

// Opsi Grafik Asupan Gizi
const nutritionOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Grafik Asupan Gizi Ibu Hamil Selama 1 Bulan",
    },
  },
};
</script>

<template>
  <div class="p-4 space-y-10">
    <!-- Grafik Mood -->
    <div>
      <Bar :data="moodData" :options="moodOptions" />
    </div>

    <!-- Grafik Asupan Gizi -->
    <div>
      <Bar :data="nutritionData" :options="nutritionOptions" />
    </div>
  </div>
</template>
