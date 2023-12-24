<script setup>
import HeaderVue from '../../components/Header.vue'
import FooterVue from '../../components/Footer.vue'
</script>

<template>
  <div>
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
    <FooterVue />
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
