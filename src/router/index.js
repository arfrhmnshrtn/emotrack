// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

// Pages
import Home from "../pages/Home/Home.vue";
import Login from "../pages/Auth/Login.vue";
import Register from "../pages/Auth/Register.vue";
import Gizi from "../pages/Home/Gizi/Gizi.vue";
import Jurnal from "../pages/Home/Jurnal/Jurnal.vue";
import Profile from "../pages/Home/Profile/Profile.vue";
import Artikel from "../pages/Home/Artikels/Artikel.vue";
import Grafik from "../pages/Home/Grafik/Grafik.vue";
import ChatBot from "../pages/Home/ChatBot/ChatBot.vue";
import Settings from "../pages/Home/Profile/Settings.vue";
import ViewJurnal from "../pages/Home/Jurnal/ViewJurnal.vue";
import DetailArtikel from "../pages/Home/Artikels/DetailArtikel.vue";
import Notifikasi from "../pages/Home/Notifikasi.vue";
import VerifyRegister from "../pages/Auth/VerifyRegister.vue";
import VerifyResetPassword from "../pages/Auth/VerifyResetPassword.vue";
import ForgetPassword from "../pages/Auth/ForgetPassword.vue";
import DetailJurnal from "../pages/Home/Jurnal/DetailJurnal.vue";
// import viewGizi from "../pages/ViewGizi.vue";
import DetailGizi from "../pages/Home/Gizi/DetailGizi.vue";
import InputNewPassword from "../pages/Auth/InputNewPassword.vue";
import viewGizi from "../pages/Home/Gizi/viewGizi.vue";
import EditProfile from "../pages/Home/Profile/EditProfile.vue";
import Bantuan from "../pages/Home/Profile/Bantuan.vue";

const routes = [
  { path: "/", name: "Login", component: Login, meta: { public: true } },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { public: true },
  },
  {
    path: "/input-new-password",
    name: "InputNewPassword",
    component: InputNewPassword,
    meta: { public: true },
  },
  { path: "/dashboard", name: "Home", component: Home },
  { path: "/gizi", name: "Gizi", component: Gizi },
  { path: "/jurnal", name: "Jurnal", component: Jurnal },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/artikel", name: "Artikel", component: Artikel },
  { path: "/grafik", name: "Grafik", component: Grafik },
  { path: "/chatbot", name: "ChatBot", component: ChatBot },
  { path: "/settings", name: "Settings", component: Settings },
  { path: "/viewjurnal", name: "ViewJurnal", component: ViewJurnal },
  { path: "/detailartikel", name: "DetailArtikel", component: DetailArtikel },
  { path: "/notifikasi", name: "Notifikasi", component: Notifikasi },
  { path: "/detailjurnal/:id", name: "detailJurnal", component: DetailJurnal },
  { path: "/viewgizi", name: "viewGizi", component: viewGizi },
  { path: "/detailgizi/:id", name: "DetailGizi", component: DetailGizi },
  { path: "/edit-profile", name: "EditProfile", component: EditProfile },
  { path: "/bantuan", name: "Bantuan", component: Bantuan },
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
  const user = localStorage.getItem("user");

  // ✅ Kalau user buka "/" (Login) tapi sudah punya token → lempar ke Dashboard
  if (to.name === "Login" && user) {
    return next({ name: "Home" });
  }

  // Jika mencoba mengakses halaman terproteksi dan tidak ada token/user
  if (!to.meta.public && !user) {
    return next({ name: "Login" });
  }

  next();
});

export default router;
