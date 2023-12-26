<script setup>
import { globalStore } from '@/stores/global'
const store = globalStore()
const props = defineProps({
  showing: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'dark'
  },
  judul: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    default: []
  }
})
</script>
<template>
  <div class="my-alert" v-show="props.showing">
    <div
      :class="[
        'alert alert-dismissible fade',
        props.showing ? 'show' : '',
        `alert-${props.status}`
      ]"
      role="alert"
    >
      <h4 class="alert-heading m-0" v-text="props.judul"></h4>

      <p v-for="(d, i) in props.data" class="mb-0 mt-1" :key="i">
        {{ d }}
      </p>
      <button type="button" class="btn-close" @click="store.closeAlert()"></button>
    </div>
  </div>
</template>

<style scoped>
.my-alert {
  position: fixed;
  right: 5px;
  top: 5px;
  z-index: 99995;
  width: calc(200px + 30vmin);
}
</style>
