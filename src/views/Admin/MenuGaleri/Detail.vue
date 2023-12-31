<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { globalStore } from '@/stores/global'
import { useGalleryStore } from '@/stores/gallery'
import SkeletonLoading from '@/components/SkeletonLoading.vue'
import axios from 'axios'

import dayjs from 'dayjs'

const router = useRouter()
const route = useRoute()

const store = globalStore()
const storeGallery = useGalleryStore()

const id = route.params.id

const judul = ref('')
const deskripsi = ref('')
const fileInput = ref('')
const kategoriFoto = ref('')

const currentGallaries = computed(() => storeGallery.currentGallaries)
const created_at = computed(() =>
  currentGallaries.value
    ? dayjs(currentGallaries.value.created_at).format('DD MMMM YYYY H:mm:ss')
    : null
)
const reset = () => {
  judul.value = currentGallaries.value.judul
  deskripsi.value = currentGallaries.value.deskripsi
  fileInput.value = currentGallaries.value.foto
  kategoriFoto.value = currentGallaries.value.category.name
}

const getData = async () => {
  if (storeGallery.currentGallaries && id == storeGallery.currentGallaries.id) {
    // jika ada data current contact, maka pakai saja
    return reset()
  }
  storeGallery.currentGallaries = null //set ke 0 apabila kondisi di atas benar

  const result = await axios
    .get(`/api/gallery/${id}`)
    .then((response) => response)
    .catch((error) => error)

  const { status, statusText } = result.request

  if (status == 200) {
    // berhasil
    const { data } = result.data

    judul.value = data.judul
    deskripsi.value = data.deskripsi
    fileInput.value = data.foto
    kategoriFoto.value = data.category.name

    storeGallery.currentGallaries = data // add global current
    return true
  }

  const { data } = result.response

  store.myAlert(true, 'danger', statusText, [data.message])
  router.push({ name: 'manage_galeri' })
}
getData()
</script>
<template>
  <div class="wrapper rounded-top-5 bg-light">
    <i class="bi bi-x-lg close" @click="$router.push({ name: 'manage_galeri' })"></i>

    <div class="container py-4">
      <div class="fs-3 mb-4">Detail Data Galeri</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item bg-transparent px-0 py-3">
          <div class="row gy-2">
            <div class="col-md-6 fw-bold">Foto</div>
            <div class="col-md-6 text-md-end text-start">
              <div v-if="fileInput">
                <img :src="fileInput" width="200" alt="" class="rounded my-ratio" />
              </div>
              <SkeletonLoading v-else height="20" />
            </div>
          </div>
        </li>
        <li class="list-group-item bg-transparent px-0 py-3">
          <div class="row gy-2">
            <div class="col-md-6 fw-bold">Judul</div>
            <div class="col-md-6 text-md-end text-start">
              <div v-if="judul">
                {{ judul }}
              </div>
              <SkeletonLoading v-else height="20" />
            </div>
          </div>
        </li>
        <li class="list-group-item bg-transparent px-0 py-3">
          <div class="row gy-2">
            <div class="col-md-6 fw-bold">Kategori</div>
            <div class="col-md-6 text-md-end text-start">
              <div v-if="kategoriFoto">
                {{ kategoriFoto }}
              </div>
              <SkeletonLoading v-else height="20" />
            </div>
          </div>
        </li>
        <li class="list-group-item bg-transparent px-0 py-3">
          <div class="row gy-2">
            <div class="col-md-6 fw-bold">Deskripsi</div>
            <div class="col-md-6 text-md-end text-start">
              <div v-if="deskripsi">
                {{ deskripsi }}
              </div>
              <SkeletonLoading v-else height="20" />
            </div>
          </div>
        </li>
        <li class="list-group-item bg-transparent px-0 py-3">
          <div class="row gy-2">
            <div class="col-md-6 fw-bold">Data Dibuat Pada</div>
            <div class="col-md-6 text-md-end text-start">
              <div v-if="created_at">{{ created_at }}</div>
              <SkeletonLoading v-else height="20" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  position: fixed;
  inset: 0;

  z-index: 999;
  overflow: auto;
}
.wrapper .close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-weight: bold;
  font-size: 30px;
  cursor: pointer;
}

.save-button {
  position: fixed;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-left-radius: 50%;

  padding: 0 60px 50px 0;

  bottom: -80px;
  right: -80px;
  font-size: 25px;
  width: 200px;
  height: 200px;

  z-index: 999;
}
.reset-button {
  position: fixed;
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;

  padding: 0 0 50px 60px;

  bottom: -80px;
  left: -80px;
  font-size: 25px;
  width: 200px;
  height: 200px;

  z-index: 999;
}
</style>
