<script setup>
import { globalStore } from '@/stores/global'
const store = globalStore()
</script>
<template>
  <div :class="['loading-action', store.loadingAction ? '' : 'hide']">
    <span class="loader"></span>
  </div>
</template>
<style scoped>
.loading-action {
  position: fixed;
  inset: 0;
  z-index: 99996;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  background: rgba(0, 0, 0, 0.8);
}
.loading-action.hide {
  opacity: 0;
  z-index: -99996;
}
.loader,
.loader:before,
.loader:after {
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  animation-fill-mode: both;
  animation: bblFadInOut 1.8s infinite ease-in-out;
}
.loader {
  color: #fff;
  font-size: 7px;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
}
.loader:before {
  left: -3.5em;
  animation-delay: -0.32s;
}
.loader:after {
  left: 3.5em;
}

@keyframes bblFadInOut {
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
}
</style>
