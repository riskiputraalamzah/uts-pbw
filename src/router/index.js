import { createRouter, createWebHistory } from 'vue-router'
import { globalStore } from '../stores/global'
import { useContactsStore } from '../stores/contacts'
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
      component: () => import('../views/Auth/LoginView.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          // sudah pernah login
          toggleScrollBody()
          toggleLoading()
          return next('/')
        }
        next()
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/RegisterView.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem('token')) {
          // sudah pernah login
          toggleScrollBody()
          toggleLoading()
          return next('/')
        }
        next()
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Admin/DashboardView.vue'),
      meta: {
        admin: true,
        requiresAuth: true
      }
    },
    {
      path: '/manage',
      redirect: { name: 'dashboard' },
      meta: {
        admin: true,
        parent: true,
        requiresAuth: true,
        noLoadingScreen: true
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
          component: () => import('../views/Admin/MenuGaleri/Main.vue'),
          children: [
            {
              meta: { noLoadingScreen: true },
              path: 'add',
              name: 'addGaleri',
              component: () => import('../views/Admin/MenuGaleri/Add.vue')
            },
            {
              meta: { noLoadingScreen: true },
              path: ':id',
              name: 'detailGaleri',
              component: () => import('../views/Admin/MenuGaleri/Detail.vue')
            },
            {
              meta: { noLoadingScreen: true },
              path: 'edit/:id',
              name: 'editGaleri',
              component: () => import('../views/Admin/MenuGaleri/Edit.vue')
            }
          ]
        },
        {
          path: 'kontak-kami',
          name: 'manage_kontak',
          component: () => import('../views/Admin/MenuKontak/Main.vue'),

          children: [
            {
              path: 'add',
              name: 'addContact',
              component: () => import('../views/Admin/MenuKontak/Add.vue')
            },
            {
              path: ':slug',
              name: 'detailContact',
              component: () => import('../views/Admin/MenuKontak/Detail.vue')
            },
            {
              path: 'edit/:slug',
              name: 'editContact',
              component: () => import('../views/Admin/MenuKontak/Edit.vue')
            }
          ]
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
  const store = globalStore()

  if (!to.meta.noLoadingScreen) {
    toggleScrollBody()
    toggleLoading()
  }
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      if (!to.meta.noLoadingScreen) {
        toggleScrollBody()
        toggleLoading()
      }

      next('/login')

      setTimeout(() => {
        store.myAlert(true, 'danger', 'Failed', ['Anda harus login terlebih dahulu'])
      }, 1000)
    }
  } else {
    next()
  }

  // to and from are both route objects. must call `next`.
})
router.afterEach((to, from) => {
  setTimeout(() => {
    if (!to.meta.noLoadingScreen) {
      toggleScrollBody()
      toggleLoading()
    }
    AOS.init({
      offset: 100,
      once: true
    })
  }, 1000)
})
export default router
