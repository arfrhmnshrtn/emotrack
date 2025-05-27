// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Gizi from "../pages/Gizi.vue";
import Jurnal from "../pages/Jurnal.vue";
import Mood from "../pages/Mood.vue";
import Profile from "../pages/Profile.vue";
import Artikel from "../pages/Artikel.vue";
import Grafik from "../pages/Grafik.vue";
import ChatBot from "../pages/ChatBot.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/dashboard", name: "Home", component: Home },
  { path: "/register", name: "Register", component: Register },
  { path: "/gizi", name: "Gizi", component: Gizi },
  { path: "/jurnal", name: "Jurnal", component: Jurnal },
  { path: "/mood", name: "Mood", component: Mood },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/artikel", name: "Artikel", component: Artikel },
  { path: "/grafik", name: "Grafik", component: Grafik },
  { path: "/chatbot", name: "ChatBot", component: ChatBot },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
