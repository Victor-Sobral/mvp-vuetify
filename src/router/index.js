import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/LoginLayout.vue'),
      meta: {
        requireAuth: false, //resposável por dizer qual rota esta sujeita a necessidade de esta logado
      },
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('@/pages/LoginPage.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/pages/RegisterPage.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/layouts/DefautLayout.vue'),
      meta: {
        requireAuth: true, //resposável por dizer qual rota esta sujeita a necessidade de esta logado
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/pages/HomePage.vue'),
        },
        {
          path: '/category',
          name: 'category',
          component: () => import('@/pages/CategoryPage.vue'),
        },
        {
          path: '/form-category/:id?', //o :id? permite que se capture a id de uma determinada categoria para permitir que ela seja editavel na aplicação //
          name: 'form-category',
          component: () => import('@/pages/CategoryFormPage.vue'),
        },
        {
          path: '/product',
          name: 'product',
          component: () => import('@/pages/ProductPage.vue'),
        },
        {
          path: '/form-product/:id?', //o :id? permite que se capture a id de uma determinada categoria para permitir que ela seja editavel na aplicação //
          name: 'form-product',
          component: () => import('@/pages/ProductFormPage.vue'),
        },
      ],
    },
  ],
})

// parte do código responsavel pela validação do login na aplicação.
const auth = useAuth()
router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.requireAuth)

  if (requireAuth && auth.isTokenExpire()) {
    next({ name: 'login' })
  } else if (!requireAuth && !auth.isTokenExpire() && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
