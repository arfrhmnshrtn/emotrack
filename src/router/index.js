// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

// Pages
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
import Settings from "../pages/Settings.vue";
import ViewJurnal from "../pages/ViewJurnal.vue";
import DetailArtikel from "../pages/DetailaArtikel.vue";
import Notifikasi from "../pages/Notifikasi.vue";
import VerifyRegister from "../pages/VerifyRegister.vue";
import VerifyResetPassword from "../pages/VerifyResetPassword.vue";
import ForgetPassword from "../pages/ForgetPassword.vue";
import detailJurnal from "../pages/DetailJurnal.vue";
import viewGizi from "../pages/viewGizi.vue";
import DetailGizi from "../pages/DetailGizi.vue";

const routes = [
  { path: "/", name: "Login", component: Login, meta: { public: true } },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { public: true },
  },
  { path: "/dashboard", name: "Home", component: Home },
  { path: "/gizi", name: "Gizi", component: Gizi },
  { path: "/jurnal", name: "Jurnal", component: Jurnal },
  { path: "/mood", name: "Mood", component: Mood },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/artikel", name: "Artikel", component: Artikel },
  { path: "/grafik", name: "Grafik", component: Grafik },
  { path: "/chatbot", name: "ChatBot", component: ChatBot },
  { path: "/settings", name: "Settings", component: Settings },
  { path: "/viewjurnal", name: "ViewJurnal", component: ViewJurnal },
  { path: "/detailartikel", name: "DetailArtikel", component: DetailArtikel },
  { path: "/notifikasi", name: "Notifikasi", component: Notifikasi },
  { path: "/detailjurnal/:id", name: "detailJurnal", component: detailJurnal },
  { path: "/viewgizi", name: "viewGizi", component: viewGizi },
  { path: "/detailgizi/:id", name: "DetailGizi", component: DetailGizi },
  {
    path: "/verify-register",
    name: "VerifyRegister",
    component: VerifyRegister,
    meta: { public: true },
  },
  {
    path: "/verify-reset-password",
    name: "VerifyResetPassword",
    component: VerifyResetPassword,
    meta: { public: true },
  },
  {
    path: "/forget-password",
    name: "ForgetPassword",
    component: ForgetPassword,
    meta: { public: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard: Cegah akses halaman private jika belum login
router.beforeEach((to, from, next) => {
  // Cek apakah ada token atau user data di localStorage
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // Jika mencoba mengakses halaman terproteksi dan tidak ada token/user
  if (!to.meta.public && !token && !user) {
    return next({ name: "Login" });
  }

  // Jika sudah login tapi mencoba mengakses halaman login/register
  if ((to.name === "Login" || to.name === "Register") && token && user) {
    return next({ name: "Home" }); // atau halaman default setelah login
  }

  next();
});

export default router;
