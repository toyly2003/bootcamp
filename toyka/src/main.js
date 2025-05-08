import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from "vue-router";
const app = createApp(App);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/about",
      component: () => import("@/views/About.vue"),
    },
    {
      path: "/service",
      component: () => import("@/views/Service.vue"),
    },
    {
      path: "/contact",
      component: () => import("@/views/Contact.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Scroll to the top of the page when navigating
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, left: 0, behavior: "smooth" };
  },
});
app.use(router);
app.mount('#app');
