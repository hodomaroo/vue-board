import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemView from '../views/ItemView.vue'
import LoginForm from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import MainView from '../views/MainView.vue'
import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginForm,
      meta: {
        authFree: true,
        transition: 'fade'
      }
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
      meta: {
        authFree: true,
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

router.beforeEach((to, from, next) => {
  console.log(store.state.auth)
  if (store.state.auth.isAuthenticated) {
    if (to.meta?.authFree) {
      next({ name: from ? from.name : 'home' })
    } else {
      next()
    }
  } else if (!store.state.auth.isAuthenticated && to.meta.authFree) {
    next()
  } else {
    next({ name: 'login' })
  }
})

export default router
