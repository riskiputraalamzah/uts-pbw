<script setup>
import { RouterView } from 'vue-router'
import HeaderVue from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div>
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
</style>
