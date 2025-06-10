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
import Dashboard from "../layout/Home.vue";
import Settings from "../pages/Settings.vue";
import ViewJurnal from "../pages/ViewJurnal.vue";
import DetailArtikel from "../pages/DetailaArtikel.vue";

const routes = [
  { path: "/", name: "Login", component: Login, meta: { public: true } },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { public: true },
  },
  {
    path: "/dashboard",
    name: "Home",
    component: Home,
  },
  { path: "/gizi", name: "Gizi", component: Gizi },
  { path: "/jurnal", name: "Jurnal", component: Jurnal },
  { path: "/mood", name: "Mood", component: Mood },
  { path: "/profile", name: "Profile", component: Profile },
  {
    path: "/artikel",
    name: "Artikel",
    component: Artikel,
  },
  { path: "/grafik", name: "Grafik", component: Grafik },
  { path: "/chatbot", name: "ChatBot", component: ChatBot },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  },
  {
    path: "/viewjurnal",
    name: "ViewJurnal",
    component: ViewJurnal,
  },
  {
    path: "/detailartikel",
    name: "DetailArtikel",
    component: DetailArtikel,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isPublic = to.matched.some((record) => record.meta.public);

  if (!isPublic && !user) {
    return next("/");
  }
  next();
});

export default router;
