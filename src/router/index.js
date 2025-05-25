// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/pages/Home.vue";
import Login from "../components/pages/Login.vue";
import Register from "../components/pages/Register.vue";

const routes = [
  { path: "/", name: "Login", component: Login },
  { path: "/dashboard", name: "Home", component: Home },
  { path: "/register", name: "Register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
