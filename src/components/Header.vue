<script setup>
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
        <a href="index.html">
          <img src="/assets/img/logo-web.png" alt="" class="img-fluid" />
        </a>
      </h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar">
        <ul>
          <li @click="toggle($event.target)">
            <router-link active-class="active" to="/">Home</router-link>
          </li>
          <li @click="toggle($event.target)">
            <router-link active-class="active" to="/profil">Profil</router-link>
          </li>
          <li @click="toggle($event.target)"><a href="events.html">Events</a></li>
          <li @click="toggle($event.target)"><a href="gallery.html">Gallery</a></li>

          <li @click="toggle($event.target)">
            <router-link active-class="active" to="/kontak-kami">Kontak Kami</router-link>
          </li>
        </ul>
        <i class="bi bi-list mobile-nav-toggle" @click="toggle($event.target)"></i>
      </nav>
      <!-- .navbar -->
    </div>
  </header>
</template>
