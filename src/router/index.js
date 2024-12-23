import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import AboutView from '@/pages/AboutView.vue'
import SeachView from '@/pages/SearchView.vue'
import PokemonView from '@/pages/PokemonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },{
      path: '/pokemon/:value?/',
      name: 'pokemon',
      component: PokemonView
    },
    {
      path: '/search/:name?/',
      name: 'search',
      component: SeachView
    }
  ]
})

export default router
