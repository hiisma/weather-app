import { createRouter, createWebHistory } from 'vue-router'
import WeatherWidgetView from '../views/WeatherWidgetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WeatherWidgetView
    },
  ]
})

export default router
