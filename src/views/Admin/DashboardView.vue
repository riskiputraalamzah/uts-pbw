<script setup>
import { computed } from 'vue'
import { globalStore } from '../../stores/global'
const store = globalStore()

const isLogin = computed(() => store.isLogin)

console.log(isLogin)
</script>
<template>
  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Dashboard</h2>
        </div>
      </div>
    </section>
    <!-- End Breadcrumbs -->

    <!-- ======= Story Intro Section ======= -->
    <section id="story-intro" class="story-intro overflow-hidden">
      <div class="container"></div>
    </section>

    <!-- End Members Section -->
  </main>
</template>
