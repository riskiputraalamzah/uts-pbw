<script setup>
import { onMounted } from 'vue'

let currentValue = 0
const delay = () => {
  let result = 100
  if (currentValue >= 4) {
    currentValue = 0
  }
  result = result * currentValue
  currentValue++
  console.log(result)
  return result
}

onMounted(() => {
  const myScript = document.querySelector('.my-script')
  myScript.innerHTML = ''
  let recaptchaScript = document.createElement('script')
  recaptchaScript.setAttribute('src', '/assets/js/main.js')
  recaptchaScript.setAttribute('defer', true)
  myScript.appendChild(recaptchaScript)
})
const tags = ['palestine', 'justice', 'holiday']
const result = [
  { tag: 'palestine', url: '4.jpg', title: 'judul', desc: 'deskripsi' },
  { tag: 'palestine', url: '5.jpg', title: 'judul', desc: 'deskripsi' },
  { tag: 'palestine', url: '2.jpg', title: 'judul', desc: 'deskripsi' },
  { tag: 'holiday', url: '7.jpg', title: 'judul', desc: 'deskripsi' },
  { tag: 'justice', url: '1.jpg', title: 'judul', desc: 'deskripsi' },
  { tag: 'justice', url: '3.jpg', title: 'judul', desc: 'deskripsi' },
  { tag: 'justice', url: '6.jpg', title: 'judul', desc: 'deskripsi' },
  { tag: 'justice', url: '8.jpg', title: 'judul', desc: 'deskripsi' },
  { tag: 'justice', url: '9.jpg', title: 'judul', desc: 'deskripsi' }
]
</script>

<template>
  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Gallery</h2>
          <ol>
            <li><router-link to="/">Home</router-link></li>
            <li>Gallery</li>
          </ol>
        </div>
      </div>
    </section>
    <!-- End Breadcrumbs -->

    <!-- ======= Gallery Section ======= -->
    <section id="gallery" class="gallery overflow-hidden">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 d-flex justify-content-center">
            <ul id="gallery-flters">
              <li data-filter="*" class="filter-active">All</li>

              <li
                v-for="(tag, i) in tags"
                :key="i"
                v-text="tag"
                :data-filter="'.filter-' + tag"
              ></li>
            </ul>
          </div>
        </div>

        <div class="row gallery-container">
          <div
            v-for="(data, i) in result"
            :key="i"
            :class="['col-lg-3 col-md-4 col-6 gallery-item', 'filter-' + data.tag]"
          >
            <div class="gallery-wrap shadow" data-aos="fade-up" :data-aos-delay="delay()">
              <img
                :src="'/assets/hero-content/' + data.url"
                class="img-fluid img-thumbnail"
                :alt="data.title"
              />
              <div class="gallery-info">
                <h4>{{ data.title }}</h4>
                <p>{{ data.desc }}</p>
                <div class="gallery-links">
                  <a
                    :href="'/assets/hero-content/' + data.url"
                    class="glightbox"
                    :title="data.title"
                    ><i class="bx bx-plus"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Gallery Section -->
  </main>
</template>
