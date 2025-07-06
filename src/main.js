import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
// app.use(IonicVue);
// app.use(Icon);
app.use(router);
app.mount("#app");

// createApp(App).mount('#app')
