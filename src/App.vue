<script setup>
import { globalStore } from '@/stores/global'

import LayoutAdmin from './views/Admin/LayoutAdmin.vue'
import LayoutDefault from './views/Default/LayoutDefault.vue'
import Alert from './components/Alert.vue'
import LoadingAction from './components/LoadingAction.vue'

const store = globalStore()
</script>

<template>
  <div>
    <div class="loading close">
      <img src="/assets/img/logo-web.png" alt="" />
    </div>
    <Alert
      :showing="store.alert.showing"
      :status="store.alert.status"
      :judul="store.alert.judul"
      :data="store.alert.data"
    />

    <LoadingAction />

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
