<script setup>
const toggleLoading = () => {
  document.querySelector('.loading').classList.toggle('close')
}
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
      <h1 class="logo">
        <router-link to="/">
          <img src="/assets/img/logo-web.png" alt="" class="img-fluid" />
        </router-link>
      </h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar">
        <ul>
          <li @click="toggle($event.target)">
            <router-link active-class="active disabled" @click="toggleLoading" to="/"
              >Home</router-link
            >
          </li>
          <li @click="toggle($event.target)">
            <router-link active-class="active disabled" @click="toggleLoading" to="/profil"
              >Profil</router-link
            >
          </li>
          <li @click="toggle($event.target)">
            <router-link active-class="active disabled" @click="toggleLoading" to="/berita"
              >Berita</router-link
            >
          </li>
          <li @click="toggle($event.target)">
            <router-link active-class="active disabled" @click="toggleLoading" to="/galeri"
              >Galeri</router-link
            >
          </li>

          <li @click="toggle($event.target)">
            <router-link active-class="active disabled" @click="toggleLoading" to="/kontak-kami"
              >Kontak</router-link
            >
          </li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle" @click="toggle($event.target)"></i>
      </nav>
      <!-- .navbar -->
    </div>
  </header>
</template>
<style scoped>
a.disabled {
  pointer-events: none;
}
</style>
