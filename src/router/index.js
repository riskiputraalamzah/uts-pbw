import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Default/HomeView.vue'
import AOS from 'aos'
import 'aos/dist/aos.css' // You can also use <link> for styles

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' }
    },
    {
      path: '/profil',
      name: 'profil',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Default/ProfileView.vue')
    },
    {
      path: '/kontak-kami',
      name: 'kontak',
      component: () => import('../views/Default/KontakView.vue')
    },
    {
      path: '/berita',
      name: 'berita',
      component: () => import('../views/Default/BeritaView.vue')
    },
    {
      path: '/galeri',
      name: 'galeri',
      component: () => import('../views/Default/GaleriView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/RegisterView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Admin/DashboardView.vue'),
      meta: {
        admin: true
      }
    },
    {
      path: '/manage',
      redirect: { name: 'dashboard' },
      meta: {
        admin: true,
        parent: true
      },
      children: [
        {
          path: 'home',
          name: 'manage_home',
          component: () => import('../views/Admin/MenuHome/Main.vue')
        },
        {
          path: 'profil',
          name: 'manage_profil',
          component: () => import('../views/Admin/MenuProfil/Main.vue')
        },
        {
          path: 'berita',
          name: 'manage_berita',
          component: () => import('../views/Admin/MenuBerita/Main.vue')
        },
        {
          path: 'galeri',
          name: 'manage_galeri',
          component: () => import('../views/Admin/MenuGaleri/Main.vue')
        },
        {
          path: 'kontak-kami',
          name: 'manage_kontak',
          component: () => import('../views/Admin/MenuKontak/Main.vue')
        }
      ]
    }
  ]
})

const toggleLoading = () => {
  document.querySelector('.loading').classList.toggle('close')
}
const toggleScrollBody = () => {
  document.body.classList.toggle('overflow-hidden')
}
router.beforeEach((to, from, next) => {
  toggleScrollBody()
  toggleLoading()
  next()
  // to and from are both route objects. must call `next`.
})
router.afterEach((to, from) => {
  setTimeout(() => {
    toggleScrollBody()
    toggleLoading()
    AOS.init({
      offset: 100,
      once: true
    })
  }, 1000)
})
export default router
