<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useContactsStore } from '@/stores/contacts'
import SkeletonLoading from '@/components/SkeletonLoading.vue'
import axios from 'axios'

import dayjs from 'dayjs'

const router = useRouter()
const route = useRoute()
const store = useContactsStore()

const slug = route.params.slug

const nama = ref('')
const type = ref('')
const email = ref('')
const detail_lokasi = ref('')
const no_telp = ref('')
const gmaps = ref('')

const currentContact = computed(() => store.currentContact)
const created_at = computed(() =>
  currentContact.value
    ? dayjs(currentContact.value.created_at).format('DD MMMM YYYY H:mm:ss')
    : null
)

const reset = () => {
  nama.value = currentContact.value.name
  email.value = currentContact.value.email
  detail_lokasi.value = currentContact.value.lokasi
  no_telp.value = currentContact.value.telp
  gmaps.value = currentContact.value.map
  type.value = currentContact.value.type
}

const getData = async () => {
  if (store.currentContact && slug == store.currentContact.slug) {
    // jika ada data current contact, maka pakai saja
    return reset()
  }
  store.currentContact = null //set ke 0 apabila kondisi di atas benar

  const result = await axios
    .get(`/api/contacts/${slug}`)
    .then((response) => response)
    .catch((error) => error)

  const { status, statusText } = result.request

  if (status == 200) {
    // berhasil
    const { data } = result.data

    nama.value = data.name
    email.value = data.email
    detail_lokasi.value = data.lokasi
    no_telp.value = data.telp
    gmaps.value = data.map
    type.value = data.type

    store.currentContact = data // add global current
    return true
  }

  const { data } = result.response

  store.myAlert(true, 'danger', statusText, [data.message])
  router.push({ name: 'manage_kontak' })
}
getData()
</script>
<template>
  <div class="wrapper rounded-top-5 bg-light">
    <i class="bi bi-x-lg close" @click="$router.push({ name: 'manage_kontak' })"></i>

    <div class="container py-4">
      <div class="fs-3 mb-4">Detail Data Kontak</div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item bg-transparent px-0 py-3">
          <div class="row gy-2">
            <div class="col-md-6 fw-bold">Nama Lokasi</div>
            <div class="col-md-6 text-md-end text-start">
              <div v-if="nama">
                {{ nama }}
              </div>
              <SkeletonLoading v-else height="20" />
            </div>
          </div>
        </li>
        <li class="list-group-item bg-transparent px-0 py-3">
          <div class="row gy-2">
            <div class="col-md-6 fw-bold">Tipe Lokasi</div>
            <div class="col-md-6 text-md-end text-start">
              <div v-if="type">
                <span
                  v-text="type"
                  :class="['btn btn-sm', type == 'pusat' ? 'btn-primary' : 'btn-success']"
                ></span>
              </div>
              <SkeletonLoading v-else height="20" />
            </div>
          </div>
        </li>
        <li class="list-group-item bg-transparent px-0 py-3">
          <div class="row gy-2">
            <div class="col-md-6 fw-bold">Detail Lokasi</div>
            <div class="col-md-6 text-md-end text-start">
              <div v-if="detail_lokasi">
                {{ detail_lokasi }}
              </div>
              <SkeletonLoading v-else height="20" />
            </div>
          </div>
        </li>
        <li class="list-group-item bg-transparent px-0 py-3">
          <div class="row gy-2">
            <div class="col-md-6 fw-bold">Email</div>
            <div class="col-md-6 text-md-end text-start">
              <div v-if="email">
                {{ email }}
              </div>
              <SkeletonLoading v-else height="20" />
            </div>
          </div>
        </li>
        <li class="list-group-item bg-transparent px-0 py-3">
          <div class="row gy-2">
            <div class="col-md-6 fw-bold">No Telp</div>
            <div class="col-md-6 text-md-end text-start">
              <div v-if="no_telp">0{{ no_telp }}</div>
              <SkeletonLoading v-else height="20" />
            </div>
          </div>
        </li>
        <li class="list-group-item bg-transparent px-0 py-3">
          <div class="row gy-2">
            <div class="col-md-6 fw-bold">GMaps</div>
            <div class="col-md-6 text-md-end text-start">
              <div v-if="gmaps">
                <iframe :src="gmaps" class="w-100" height="200" frameborder="0"></iframe>
              </div>
              <SkeletonLoading v-else height="290" />
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
