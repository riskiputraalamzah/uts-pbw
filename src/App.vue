<script setup>
import { RouterView } from 'vue-router'
import HeaderVue from './components/Header.vue'
import Footer from './components/Footer.vue'

// const links = [
//   'assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
//   'assets/vendor/glightbox/js/glightbox.min.js',
//   'assets/vendor/isotope-layout/isotope.pkgd.min.js',
//   'assets/vendor/swiper/swiper-bundle.min.js',
//   'assets/vendor/php-email-form/validate.js'
// ]

// links.forEach((link) => {
//   let recaptchaScript = document.createElement('script')
//   recaptchaScript.setAttribute('src', link)
//   document.head.appendChild(recaptchaScript)
// })
</script>

<template>
  <div>
    <div class="loading">
      <img src="/assets/img/logo-web.png" alt="" />
    </div>
    <HeaderVue />
    <div>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loading {
  position: fixed;
  z-index: 99999;
  inset: 0;
  background: var(--primaryColor);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 1;
}
.loading img {
  width: calc(200px + 20vw);
}
.loading.close {
  transition: all 0.5s ease;
  opacity: 0;
  z-index: -9999;
}
</style>
