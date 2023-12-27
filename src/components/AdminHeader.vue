<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { globalStore } from '@/stores/global'
import axios from 'axios'

const store = globalStore()
const location = useRoute()
const router = useRouter()

const disabled = computed(() => location.path == '/dashboard')

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
const activeDropdown = ref(false)
const toggleDropdown = () => (activeDropdown.value = !activeDropdown.value)

const handleLogout = async () => {
  const confirm = window.confirm('Anda yakin ?')
  if (confirm) {
    store.toggleLoadingAction()

    await axios.get('/sanctum/csrf-cookie')
    const result = await axios
      .post('/api/logout', {
        username: store.user.username
      })
      .then((response) => response)
      .catch(({ response }) => response)

    store.toggleLoadingAction()
    // return console.log(result)
    const { status, statusText } = result.request

    if (status == 200) {
      // berhasil

      const { data, message } = result.data

      localStorage.removeItem('token')
      localStorage.removeItem('isLogin')
      localStorage.removeItem('user')

      store.userLogout()
      router.push('/')
      setTimeout(() => {
        store.myAlert(true, 'success', message, [data])
      }, 1200)
      return true
    }

    const { message } = result.data
    store.myAlert(true, 'danger', statusText, [message])
  }
}
</script>
<template>
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center justify-content-between">
      <h1 :class="[disabled ? 'disabled' : '', 'logo', 'position-relative']">
        <router-link to="/dashboard">
          <img src="/assets/img/logo-web.png" alt="" class="img-fluid" />
        </router-link>
        <sup
          style="font-size: 10px"
          class="badge bg-success position-absolute top-0 start-100 translate-middle"
          >ADMINISTRATOR</sup
        >
      </h1>
      <!-- Uncomment below if you prefer to use an image logo -->
      <!-- <a href="index.html" class="logo"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->

      <nav id="navbar" class="navbar">
        <ul>
          <li @click="toggle($event.target)">
            <router-link active-class="active disabled" to="/">Home</router-link>
          </li>
          <li @click="toggle($event.target)">
            <router-link active-class="active disabled" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="dropdown" @click="toggleDropdown">
            <a :class="[$route.meta.parent ? 'active' : '']" href="#" @click.prevent
              ><span>Manage Content</span> <i class="bi bi-chevron-down"></i
            ></a>
            <ul :class="[activeDropdown || $route.meta.parent ? 'dropdown-active' : '']">
              <li @click="toggle($event.target)">
                <router-link active-class="active disabled" to="/manage/home">Home</router-link>
              </li>
              <li @click="toggle($event.target)">
                <router-link active-class="active disabled" to="/manage/profil">Profil</router-link>
              </li>
              <li @click="toggle($event.target)">
                <router-link active-class="active disabled" to="/manage/berita">Berita</router-link>
              </li>
              <li @click="toggle($event.target)">
                <router-link active-class="active disabled" to="/manage/galeri">Galeri</router-link>
              </li>

              <li @click="toggle($event.target)">
                <router-link active-class="active disabled" to="/manage/kontak-kami"
                  >Kontak</router-link
                >
              </li>
            </ul>
          </li>

          <li class="d-lg-none d-flex text-light ps-3">
            <button
              type="button"
              @click="handleLogout"
              class="btn btn-danger text-light py-2 px-4 me-2"
            >
              Logout
            </button>
          </li>
        </ul>

        <i class="bi bi-list mobile-nav-toggle" @click="toggle($event.target)"></i>
      </nav>
      <!-- .navbar -->

      <!-- desktop views -->
      <div class="d-lg-block d-none">
        <button type="button" @click="handleLogout" class="btn btn-danger py-2 px-4 me-2">
          Logout
        </button>
      </div>
      <!-- end -->
    </div>
  </header>
</template>
<style scoped>
.disabled {
  pointer-events: none;
}

.dropdown ul a {
  color: black !important;
  opacity: 0.7;
}
.dropdown ul a.active,
.dropdown ul a:hover {
  opacity: 1;
  color: #006fbe !important;
}
</style>
