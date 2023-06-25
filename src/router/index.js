import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemView from '../views/ItemView.vue'
import LoginForm from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginForm,
      meta: {
        transition: 'fade'
      }
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
      meta: {
        transition: 'fade'
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      meta: {
        transition: 'fade'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/items',
      name: 'items',
      component: ItemView
    }
  ]
})

// router.beforeEach()

export default router
