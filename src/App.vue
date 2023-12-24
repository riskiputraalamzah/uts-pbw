<script setup>
import LayoutAdmin from './views/Admin/LayoutAdmin.vue'
import LayoutDefault from './views/Default/LayoutDefault.vue'
</script>

<template>
  <div>
    <div class="loading close">
      <img src="/assets/img/logo-web.png" alt="" />
    </div>

    <LayoutAdmin v-if="$route.meta.admin" />

    <LayoutDefault v-else />
  </div>
</template>

<style scoped>
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
