import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      path: '/profil',
      name: 'profil',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/kontak-kami',
      name: 'kontak',
      component: () => import('../views/KontakView.vue')
    },
    {
      path: '/berita',
      name: 'berita',
      component: () => import('../views/BeritaView.vue')
    },
    {
      path: '/galeri',
      name: 'galeri',
      component: () => import('../views/GaleriView.vue')
    }
  ]
})

const toggleLoading = () => {
  document.querySelector('.loading').classList.toggle('close')
}
// router.beforeResolve((to, from, next) => {
//   // to and from are both route objects. must call `next`.
//   document.querySelector('.my-script').innerHTML = ''
//   next()
// })
// router.beforeEach((to, from, next) => {
//   // toggleLoading()
//   // to and from are both route objects. must call `next`.
//   document.querySelector('.my-script').innerHTML = ''
//   next()
// })

const append = (links) => {
  links.forEach((link) => {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', link)
    document.querySelector('.my-script').appendChild(recaptchaScript)
  })
}
router.afterEach((to, from) => {
  // const myScript = document.querySelector('.my-script')

  // const links = ['assets/js/main.js']

  // myScript.innerHTML = ''

  // append(links)

  // new Promise((resolve, reject) => {
  //   let script = document.createElement('script')
  //   script.onload = () => {
  //    resolve(import(someComponent))
  //   }
  //   script.async = true
  //   script.src = 'https://maps.googleapis.com/maps/api/js?key=APIKEY&libraries=places'
  //   document.head.appendChild(script)
  //  })

  // setTimeout(() => {
  // }, 1000)

  setTimeout(() => {
    toggleLoading()
  }, 1000)
})
export default router
