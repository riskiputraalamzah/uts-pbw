<script setup>
import { ref } from 'vue'
const password = ref(null)
const toggle = ref(false)

const togglePassword = () => (toggle.value = !toggle.value)
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
              <form>
                <div class="mb-4">
                  <label for="username" class="form-label">Username</label>
                  <input type="email" class="form-control" id="username" autocomplete="off" />
                </div>
                <div class="mb-4" id="input-password">
                  <label for="password" class="form-label">Password</label>
                  <input
                    ref="password"
                    :type="toggle ? 'text' : 'password'"
                    class="form-control"
                    id="password"
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
                  <button
                    @click="$router.push('/dashboard')"
                    type="button"
                    class="btn btn-primary py-2 px-5"
                  >
                    Login
                  </button>
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
