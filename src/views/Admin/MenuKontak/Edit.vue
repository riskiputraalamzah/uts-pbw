<script setup>
import { onMounted, ref, computed, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { globalStore } from '@/stores/global'
import { useContactsStore } from '@/stores/contacts'

import SkeletonLoading from '@/components/SkeletonLoading.vue'

import axios from 'axios'

const router = useRouter()
const route = useRoute()
const store = globalStore()

const contactStore = useContactsStore()

const slug = route.params.slug

const refreshDataParentKontak = inject('refreshDataParentKontak')

const nama = ref('')
const email = ref('')
const detail_lokasi = ref('')
const no_telp = ref('')
const gmaps = ref('')

const currentContact = computed(() => contactStore.currentContact)

const reset = () => {
  nama.value = currentContact.value.name
  email.value = currentContact.value.email
  detail_lokasi.value = currentContact.value.lokasi
  no_telp.value = currentContact.value.telp
  gmaps.value = currentContact.value.map
}

const validGmaps = computed(() =>
  gmaps.value != '' && gmaps.value.includes('https') ? true : false
)
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

const checkInput = () => {
  let error = []
  if (nama.value == '') {
    error.push('Nama harus di isi')
  }
  if (email.value == '') {
    error.push('Email harus di isi')
  } else if (!validateEmail(email.value)) {
    error.push('Email tidak valid')
  }
  if (no_telp.value == '') {
    error.push('No Telp harus di isi')
  }
  if (detail_lokasi.value == '') {
    error.push('Detail Lokasi harus di isi')
  }
  if (gmaps.value == '') {
    error.push('GMaps URL harus di isi')
  } else if (!validGmaps.value) {
    error.push('GMaps URL tidak valid ')
  }
  return error
}

let disabled = false

const handleSubmit = async () => {
  if (disabled) {
    return true
  }
  disabled = true
  store.toggleLoadingAction()

  const check = checkInput()

  if (check.length > 0) {
    store.myAlert(true, 'danger', 'Failed', check)
    store.toggleLoadingAction()
    setTimeout(() => {
      disabled = false
    }, 3000)

    return true
  }

  await axios.get('/sanctum/csrf-cookie')

  const result = await axios
    .post(`/api/contacts/${slug}`, {
      name: nama.value,
      email: email.value,
      map: gmaps.value,
      telp: no_telp.value,
      lokasi: detail_lokasi.value,
      _method: 'PATCH'
    })
    .then((response) => response)
    .catch((error) => error)

  store.toggleLoadingAction()

  const { status, statusText } = result.request

  if (status == 200) {
    // berhasil
    const { data, message } = result.data

    contactStore.setUserPageContacts(null)
    contactStore.currentContact = null
    refreshDataParentKontak()

    router.push({ name: 'manage_kontak' })

    setTimeout(() => {
      store.myAlert(true, 'success', message, [data])
    }, 1000)
    return true
  }

  // error
  reset()

  const { data } = result.response
  store.myAlert(true, 'danger', statusText, [data.message])

  disabled = false
}
const getData = async () => {
  if (disabled) {
    return true
  }

  if (contactStore.currentContact && slug == contactStore.currentContact.slug) {
    // jika ada data current contact, maka pakai saja
    return reset()
  }
  contactStore.currentContact = null //set ke 0 apabila kondisi di atas benar
  disabled = true

  const result = await axios
    .get(`/api/contacts/${slug}`)
    .then((response) => response)
    .catch((error) => error)

  disabled = false

  const { status, statusText } = result.request

  if (status == 200) {
    // berhasil
    const { data } = result.data

    nama.value = data.name
    email.value = data.email
    detail_lokasi.value = data.lokasi
    no_telp.value = data.telp
    gmaps.value = data.map

    contactStore.currentContact = data // add global current
    return true
  }

  const { data } = result.response

  store.myAlert(true, 'danger', statusText, [data.message])
  router.push({ name: 'manage_kontak' })
  disabled = false
}
getData()
const gMaps = () => {
  window.open(
    'https://support.google.com/maps/answer/7101463?hl=id&co=GENIE.Platform%3DDesktop',
    '_blank'
  )
}
onMounted(() => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  )
})

const formIsChanged = computed(() => {
  return [nama.value, email.value, detail_lokasi.value, no_telp.value, gmaps.value].every(
    (v, i) =>
      v ==
      [
        currentContact.value.name,
        currentContact.value.email,
        currentContact.value.lokasi,
        currentContact.value.telp,
        currentContact.value.map
      ][i]
  )
})
</script>
<template>
  <div class="wrapper rounded-top-5 bg-light">
    <i class="bi bi-x-lg close" @click="$router.push({ name: 'manage_kontak' })"></i>
    <button
      v-show="!disabled && !formIsChanged"
      class="btn btn-primary save-button"
      type="button"
      @click="handleSubmit"
    >
      Update
    </button>
    <button
      v-show="!disabled && !formIsChanged"
      class="btn btn-danger reset-button"
      type="button"
      @click="reset"
    >
      Reset
    </button>
    <div class="container py-4">
      <div class="fs-3 mb-4">Edit Data Kontak</div>
      <form @submit.prevent="handleSubmit" @change="formUpdated">
        <div class="row g-3">
          <div class="col-md-4">
            <div v-if="currentContact">
              <div class="form-floating">
                <input
                  v-model="nama"
                  type="text"
                  class="form-control"
                  autocomplete="off"
                  id="name"
                  placeholder="name@example.com"
                />
                <label for="name">Nama Lokasi</label>
              </div>
            </div>
            <div v-else>
              <SkeletonLoading height="60" />
            </div>
          </div>
          <div class="col-md-4">
            <div v-if="currentContact">
              <div class="form-floating">
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  autocomplete="off"
                  id="email"
                  placeholder="name@example.com"
                />
                <label for="email">Email</label>
              </div>
            </div>
            <div v-else>
              <SkeletonLoading height="60" />
            </div>
          </div>
          <div class="col-md-4">
            <div v-if="currentContact">
              <div class="form-floating">
                <input
                  v-model="no_telp"
                  type="number"
                  class="form-control"
                  autocomplete="off"
                  id="telp"
                  placeholder="name@example.com"
                />
                <label for="telp">No Telp</label>
              </div>
            </div>
            <div v-else>
              <SkeletonLoading height="60" />
            </div>
          </div>
          <div class="col-md-6">
            <div v-if="currentContact">
              <div class="form-floating">
                <textarea
                  v-model="detail_lokasi"
                  class="form-control"
                  autocomplete="off"
                  placeholder="Leave a comment here"
                  id="floatingTextarea"
                  style="height: 150px"
                ></textarea>
                <label for="floatingTextarea">Detail Lokasi</label>
              </div>
            </div>
            <div v-else>
              <SkeletonLoading height="150" />
            </div>
          </div>
          <div class="col-md-6">
            <div v-if="currentContact">
              <div class="form-floating">
                <textarea
                  v-model="gmaps"
                  class="form-control"
                  autocomplete="off"
                  id="telp"
                  style="height: 150px"
                  placeholder="name@example.com"
                ></textarea>
                <label for="telp">GMaps URL</label>
                <small class="form-text ps-2"
                  ><i
                    class="bi bi-info-circle-fill text-dark cursor-pointer"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="Informasi Terkait Gmaps URL"
                    @click="gMaps"
                  ></i
                ></small>
              </div>
            </div>
            <div v-else>
              <SkeletonLoading height="150" />
            </div>
          </div>

          <div class="col-12 mb-5" v-show="validGmaps">
            <div class="fs-4 mb-3 text-center">Preview GMaps URL</div>
            <iframe
              :src="validGmaps ? gmaps : ''"
              style="border: 0; width: 100%; height: 250px"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </form>
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
