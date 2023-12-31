<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { globalStore } from '../stores/global'

const store = globalStore()
const location = useRoute()

const disabled = computed(() => location.path == '/')

const toggle = (evt) => {
  const isHamburgerMenu = evt.classList.contains('mobile-nav-toggle')
  const navbar = document.querySelector('.navbar')

  if (isHamburgerMenu) {
    navbar.classList.toggle('navbar-mobile')
  } else {
    if (navbar.classList.contains('navbar-mobile')) {
      navbar.classList.toggle('navbar-mobile')
    }
  }
}
</script>
<template>
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center justify-content-between">
      <h1 :class="[disabled ? 'disabled' : '', 'logo']">
        <router-link to="/">
          <img src="/assets/img/logo-web.png" alt="" class="img-fluid" />
        </router-link>
      </h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar">
        <ul>
          <li @click="toggle($event.target)">
            <router-link active-class="active disabled" to="/">Home</router-link>
          </li>
          <li @click="toggle($event.target)">
            <router-link active-class="active disabled" to="/profil">Profil</router-link>
          </li>
          <li @click="toggle($event.target)">
            <router-link active-class="active disabled" to="/berita">Berita</router-link>
          </li>
          <li @click="toggle($event.target)">
            <router-link active-class="active disabled" to="/galeri">Galeri</router-link>
          </li>

          <li @click="toggle($event.target)">
            <router-link active-class="active disabled" to="/kontak-kami">Kontak</router-link>
          </li>

          <li v-if="store.isLogin" class="d-lg-none d-flex">
            <router-link
              @click="toggle($event.target)"
              active-class="active disabled"
              to="/dashboard"
              class="text-decoration-none d-flex align-items-center justify-content-start ps-2"
            >
              <i class="bi bi-person fs-3 me-1"></i>{{ store.user.name }}</router-link
            >
          </li>
          <li v-else class="d-lg-none d-flex text-light ps-3">
            <router-link
              @click="toggle($event.target)"
              active-class="active disabled"
              class="btn btn-success text-light py-2 px-4 me-2"
              to="/login"
              >Login</router-link
            >
            <router-link
              @click="toggle($event.target)"
              active-class="active disabled"
              class="btn btn-outline-success py-2 px-4"
              to="/register"
              >Daftar</router-link
            >
          </li>
        </ul>

        <i class="bi bi-list mobile-nav-toggle" @click="toggle($event.target)"></i>
      </nav>
      <!-- .navbar -->

      <!-- desktop views -->

      <div class="d-lg-block d-none">
        <div v-if="store.isLogin">
          <router-link
            @click="toggle($event.target)"
            active-class="active disabled"
            to="/dashboard"
            class="text-decoration-none text-light d-flex align-items-center"
          >
            <i class="bi bi-person fs-3 me-1"></i>{{ store.user.name }}</router-link
          >
        </div>
        <div v-else>
          <router-link
            @click="toggle($event.target)"
            active-class="active disabled"
            class="btn btn-success py-2 px-4 me-2"
            to="/login"
            >Login</router-link
          >
          <router-link
            @click="toggle($event.target)"
            active-class="active disabled"
            class="btn btn-outline-light py-2 px-4"
            to="/register"
            >Daftar</router-link
          >
        </div>
      </div>
      <!-- end -->
    </div>
  </header>
</template>
<style scoped>
.disabled {
  pointer-events: none;
}
</style>
