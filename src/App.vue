<script setup>
import { RouterView } from 'vue-router'
import HeaderVue from './components/Header.vue'
import Footer from './components/Footer.vue'
import { onMounted } from 'vue'
onMounted(() => {
  const links = [
    'assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
    'assets/vendor/glightbox/js/glightbox.min.js',
    'assets/vendor/isotope-layout/isotope.pkgd.min.js',
    'assets/vendor/swiper/swiper-bundle.min.js',
    'assets/vendor/php-email-form/validate.js',
    'assets/js/main.js'
  ]

  // const myScript = document.querySelector('.my-script')
  // myScript.innerHTML = ''
  links.forEach((link) => {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', link)
    document.head.appendChild(recaptchaScript)
  })
})
</script>

<template>
  <div>
    <HeaderVue />
    <div>
      <router-view v-slot="{ Component }">
        <transition name="scale" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease-in-out;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
