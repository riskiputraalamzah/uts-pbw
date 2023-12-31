<template>
  <div
    class="skeleton-loading"
    :style="{
      height: props.height + 'px'
    }"
  ></div>
</template>
<script setup>
const props = defineProps(['height'])
</script>
<style scoped>
.skeleton-loading {
  width: 100%;

  background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    lightgray;
  background-repeat: repeat-y;
  background-size: 50px 500px;
  background-position: 0 0;
  animation: shine 1s infinite;
}
@keyframes shine {
  to {
    background-position:
      100% 0,
      0 0;
  }
}
</style>
