<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { globalStore } from '@/stores/global'
import axios from 'axios'

const router = useRouter()
const store = globalStore()

const nameElement = ref(null)
const usernameElement = ref(null)

const name = ref('')
const username = ref('')
const password = ref('')
const confirm_password = ref('')

const toggle = ref(false)
const togglePassword = () => (toggle.value = !toggle.value)

const isUserNameValid = (username) => {
  /*
    Usernames can only have:
    - Lowercase Letters (a-z)
    - Numbers (0-9)
    - Dots (.)
    - Underscores (_)
  */
  const res = /^[a-z0-9_\.]+$/.exec(username)
  const valid = !!res
  return valid
}

const checkInput = () => {
  let error = []
  if (name.value == '') {
    error.push('nama harus di isi')
  }

  if (username.value == '') {
    error.push('username harus di isi')
  } else if (!isUserNameValid(username.value)) {
    error.push('username tidak valid')
  }

  if (password.value == '') {
    error.push('password harus di isi')
  }
  if (confirm_password.value == '') {
    error.push('konfirmasi password harus di isi')
  }

  if (password.value && confirm_password.value && password.value != confirm_password.value) {
    error.push('password tidak sama, silahkan konfirmasi kembali')
  }
  return error
}

let disabled = false

const handleRegister = async () => {
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

  // return console.log({ name, username, password })
  await axios.get('/sanctum/csrf-cookie')
  const result = await axios
    .post('/api/register', {
      name: name.value,
      username: username.value,
      password: password.value,
      password_confirmation: confirm_password.value
    })
    .then((response) => response)
    .catch((error) => error)

  store.toggleLoadingAction()

  const { status, statusText } = result.request
  if (status == 200) {
    // berhasil
    const { data, message } = result.data

    router.push('/login')

    setTimeout(() => {
      store.myAlert(true, 'success', message, [data])
    }, 1200)
    return true
  }

  // error
  username.value = ''
  password.value = ''
  confirm_password.value = ''

  usernameElement.value.focus()

  const { data } = result.response
  store.myAlert(true, 'danger', statusText, [data.message])

  disabled = false
}

onMounted(() => {
  nameElement.value.focus()
})
</script>
<template>
  <main id="main">
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Daftar Akun</h2>
          <ol>
            <li><router-link to="/">Home</router-link></li>
            <li>Daftar</li>
          </ol>
        </div>
      </div>
    </section>

    <section id="login" class="login">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-6 col-11">
            <div class="card shadow card-body">
              <form @submit.prevent="handleRegister">
                <div class="mb-4">
                  <label for="name" class="form-label">Nama</label>
                  <input
                    ref="nameElement"
                    v-model="name"
                    type="text"
                    class="form-control"
                    id="name"
                    autocomplete="off"
                  />
                </div>
                <div class="mb-4">
                  <label for="username" class="form-label">Username</label>
                  <input
                    type="text"
                    ref="usernameElement"
                    v-model="username"
                    class="form-control"
                    id="username"
                    autocomplete="off"
                  />
                  <div class="form-text">
                    Usernames can only have: - Lowercase Letters (a-z) - Numbers (0-9) - Dots (.) -
                    Underscores (_)
                  </div>
                </div>
                <div class="mb-4">
                  <label for="password" class="form-label">Password</label>
                  <input
                    v-model="password"
                    :type="toggle ? 'text' : 'password'"
                    class="form-control"
                    id="password"
                    autocomplete="cc-number"
                  />
                </div>
                <div class="mb-4">
                  <label for="confirm_password" class="form-label">Konfirmasi Password</label>
                  <input
                    v-model="confirm_password"
                    :type="toggle ? 'text' : 'password'"
                    class="form-control"
                    id="confirm_password"
                    autocomplete="cc-number"
                  />
                </div>
                <div class="mb-4 form-check">
                  <input
                    @click="togglePassword"
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    <small> {{ toggle ? 'Sembunyikan' : 'Tampilkan' }} Password </small>
                  </label>
                </div>
                <div
                  class="d-flex align-items-center justify-content-between gap-3 flex-md-row flex-column"
                >
                  <button type="submit" class="btn btn-primary py-2 px-5">Daftar</button>
                  <small>Sudah punya Akun? <router-link to="/login">Login</router-link></small>
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
