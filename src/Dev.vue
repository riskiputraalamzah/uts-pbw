<template>
  <div>
    <h1
      class="position-fixed top-0 overlow-hidden bottom-0 start-0 end-0 bg-dark text-light text-center p-2 m-0 d-flex align-items-center justify-content-center lh-base"
    >
      Website sedang dalam tahap pengembangan<br />🤧😳🥵🥶
    </h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  document.body.classList.add('overflow-hidden')
})
</script>
