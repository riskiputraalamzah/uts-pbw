<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import HeaderVue from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div>
    <div class="loading close">
      <img src="/assets/img/logo-web.png" alt="" />
    </div>

    <a href="https://lazismu.org" target="_blank" class="btn btn-warning rounded donation">
      <i class="bi bi-coin"></i>
      <span>Donation Now</span>
    </a>
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

.donation {
  position: fixed;
  bottom: 15px;
  left: 10px;
  z-index: 99;
  display: flex;
  width: 56px;
  height: 56px;

  transition: width 0.2s ease-in-out;

  overflow: hidden;
  align-items: center;
}
.donation i {
  font-size: 30px;
}
.donation span {
  font-size: 14px;
  /* width: 0px; */
  text-wrap: nowrap;
  margin-left: 5px;

  overflow: hidden;
}
.donation:hover {
  width: 160px;
}

@media (max-width: 569px) {
  .donation,
  .donation:hover {
    width: fit-content;
    height: fit-content;
  }
  .donation i {
    font-size: 16px;
  }
  .donation span {
    font-size: 10px;
  }
}
</style>
