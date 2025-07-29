// Vue
import { createRouter, createWebHistory } from 'vue-router'

// Components
import RegisterView from '@/views/Auth/RegisterView.vue'
import LoginView from '@/views/Auth/LoginView.vue'

// Store
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@/views/Article/HomeView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: '/travels',
      name: 'travels',
      component: () => import("@/views/Article/ArticlesView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: '/create/travels',
      name: 'travels-create',
      component: () => import("@/views/Article/ArticleCreateUpdateView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: '/update/travels/:id',
      name: 'travels-update',
      component: () => import("@/views/Article/ArticleCreateUpdateView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: '/travels/:id',
      name: 'travels-user',
      component: () => import("@/views/Article/ArticlesView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: '/travels/detail/:id',
      name: 'article-detail',
      component: () => import('@/views/Article/ArticlesDetailView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/travelslist',
      name: 'travelslist',
      component: () => import("@/views/Article/ArticlesListView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: '/travelslist/:id',
      name: 'travelslist-user',
      component: () => import("@/views/Article/ArticlesListView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.jwt) {
    next({ name: 'login' })
  } else {
    next()
  }
})


export default router
