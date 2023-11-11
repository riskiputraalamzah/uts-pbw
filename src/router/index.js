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
    }
  ]
})

router.afterEach((to, from) => {
  // to and from are both route objects.
  // const myScript = document.querySelector('.my-script')
  // myScript.innerHTML = ''
  // const links = [
  //   'assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
  //   'assets/vendor/glightbox/js/glightbox.min.js',
  //   'assets/vendor/isotope-layout/isotope.pkgd.min.js',
  //   'assets/vendor/swiper/swiper-bundle.min.js',
  //   'assets/vendor/php-email-form/validate.js',
  //   'assets/js/main.js'
  // ]
  // links.forEach((link) => {
  //   let recaptchaScript = document.createElement('script')
  //   recaptchaScript.setAttribute('src', link)
  //   myScript.appendChild(recaptchaScript)
  // })
})
export default router
