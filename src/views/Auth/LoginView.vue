<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { globalStore } from '@/stores/global'
import axios from 'axios'

const router = useRouter()
const store = globalStore()

const username = ref('')
const password = ref('')
const toggle = ref(false)

const usernameElement = ref(null)

const togglePassword = () => (toggle.value = !toggle.value)

const checkInput = () => {
  let error = []
  if (username.value == '') {
    error.push('username harus di isi')
  }
  if (password.value == '') {
    error.push('password harus di isi')
  }
  return error
}

let disabled = false

const handleLogin = async () => {
  if (disabled) {
    return true
  }
  disabled = true
  store.toggleLoadingAction()

  const check = checkInput()

  if (check.length > 0) {
    store.myAlert(true, 'danger', 'Failed', check)
    store.toggleLoadingAction()
    setTimeout(() => {
      disabled = false
    }, 3000)

    return true
  }

  await axios.get('/sanctum/csrf-cookie')

  const result = await axios
    .post('/api/login', {
      username: username.value,
      password: password.value
    })
    .then((response) => response)
    .catch((error) => error)

  store.toggleLoadingAction()

  const { status, statusText } = result.request

  if (status == 200) {
    // berhasil
    const { token, user } = result.data.data

    localStorage.setItem('token', token)
    localStorage.setItem('isLogin', 'true')
    localStorage.setItem('user', JSON.stringify(user))

    store.userLogin(user)

    router.push('/dashboard')
    setTimeout(() => {
      store.myAlert(true, 'success', 'Login', ['Anda berhasil Login'])
    }, 1200)
    return true
  }

  // error
  username.value = ''
  password.value = ''

  focusUsername()

  const { data } = result.response
  store.myAlert(true, 'danger', statusText, [data.message])

  disabled = false
}

const focusUsername = () => usernameElement.value.focus()

onMounted(() => {
  focusUsername()
})
</script>
<template>
  <main id="main">
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Login</h2>
          <ol>
            <li><router-link to="/">Home</router-link></li>
            <li>Login</li>
          </ol>
        </div>
      </div>
    </section>

    <section id="login" class="login">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-11">
            <div class="card shadow card-body">
              <form @submit.prevent="handleLogin">
                <div class="mb-4">
                  <label for="username" class="form-label">Username</label>
                  <input
                    ref="usernameElement"
                    type="text"
                    v-model="username"
                    class="form-control"
                    id="username"
                    autocomplete="off"
                  />
                </div>
                <div class="mb-4" id="input-password">
                  <label for="password" class="form-label">Password</label>
                  <input
                    :type="toggle ? 'text' : 'password'"
                    class="form-control"
                    id="password"
                    v-model="password"
                    autocomplete="cc-number"
                  />
                  <i
                    :class="['bi', toggle ? 'bi-eye' : 'bi-eye-slash']"
                    @click="togglePassword"
                  ></i>
                </div>

                <div
                  class="d-flex align-items-center justify-content-between gap-3 flex-md-row flex-column"
                >
                  <button type="submit" class="btn btn-primary py-2 px-5">Login</button>
                  <small>Belum punya Akun? <router-link to="/register">Daftar</router-link></small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Contact Us Section -->
  </main>
</template>

<style scoped>
#input-password {
  position: relative;
}
#input-password i {
  position: absolute;
  z-index: 2;
  right: 5px;
  top: 50%;
  transform: translateY(calc(-50% + 24px - 0.5rem));
  font-size: 20px;
  cursor: pointer;
}
</style>
