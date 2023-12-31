<script setup>
import { onMounted, ref, computed, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { globalStore } from '@/stores/global'
import { useGalleryStore } from '@/stores/gallery'
import Swal from 'sweetalert2'
import SkeletonLoading from '@/components/SkeletonLoading.vue'

import axios from 'axios'

const router = useRouter()
const route = useRoute()

const store = globalStore()
const storeGallery = useGalleryStore()

const id = route.params.id

const currentGallaries = computed(() => storeGallery.currentGallaries)

const refreshDataParentGaleri = inject('refreshDataParentGaleri')

const judul = ref('')
const deskripsi = ref('')
const fileInput = ref('')
const kategoriFoto = ref('')
const allKategoriFoto = ref([])

const form = ref(null)
const previewFoto = ref('')

const resetValue = () => {
  judul.value = currentGallaries.value.judul
  deskripsi.value = currentGallaries.value.deskripsi
  previewFoto.value = currentGallaries.value.foto
  kategoriFoto.value = currentGallaries.value.category.id
}

const reset = () => {
  resetValue()
  form.value.reset()
}

const checkInput = () => {
  let error = []
  if (judul.value == '') {
    error.push('Judul harus di isi')
  }

  if (deskripsi.value == '') {
    error.push('Deskripsi harus di isi')
  }
  if (kategoriFoto.value == '') {
    error.push('Kategori Foto harus di pilih')
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

  let payload = {
    judul: judul.value,
    deskripsi: deskripsi.value,

    category_id: kategoriFoto.value,
    _method: 'PATCH'
  }
  if (fileInput != '') {
    // jika ada file input
    const file = {
      foto: fileInput.value
    }
    payload = { ...payload, ...file }
  }

  await axios.get('/sanctum/csrf-cookie')

  const result = await axios
    .post('/api/gallery/' + id, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => response)
    .catch((error) => error)

  store.toggleLoadingAction()

  const { status, statusText } = result.request

  if (status == 200) {
    // berhasil
    const { data, message } = result.data

    storeGallery.setUserPageGallaries(null)
    refreshDataParentGaleri()

    router.push({ name: 'manage_galeri' })

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
const handleFile = (event) => {
  const [file] = event.target.files
  if (file) {
    const url = URL.createObjectURL(file)

    previewFoto.value = url
    fileInput.value = file
  } else {
    previewFoto.value = ''
    fileInput.value = ''
  }
}
const getDataCategory = async () => {
  const response = await axios
    .get('/api/category')
    .then((response) => response)
    .catch((error) => error)

  allKategoriFoto.value = response.data.data
}

const getData = async () => {
  getDataCategory()
  if (storeGallery.currentGallaries && id == storeGallery.currentGallaries.id) {
    // jika ada data current contact, maka pakai saja
    return resetValue()
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
    previewFoto.value = data.foto
    kategoriFoto.value = data.category.id

    storeGallery.currentGallaries = data // add global current

    return true
  }

  const { data } = result.response

  store.myAlert(true, 'danger', statusText, [data.message])
  router.push({ name: 'manage_galeri' })
}
getData()

const addCategory = async () => {
  const { value: kategori } = await Swal.fire({
    title: 'Tambah Kategori',
    input: 'text',
    inputLabel: 'Nama Kategori',

    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return 'Nama Kategori harus di isi!'
      }
    }
  })
  if (kategori) {
    store.toggleLoadingAction()
    await axios.get('/sanctum/csrf-cookie')

    const result = await axios
      .post('/api/category', {
        name: kategori
      })
      .then((response) => response)
      .catch((error) => error)

    const { data } = result.data

    kategoriFoto.value = data.id

    allKategoriFoto.value.unshift(data)

    store.toggleLoadingAction()
  }
}
const formIsChanged = computed(() => {
  if (currentGallaries.value) {
    return [judul.value, deskripsi.value, previewFoto.value, kategoriFoto.value].every(
      (v, i) =>
        v ==
        [
          currentGallaries.value.judul,
          currentGallaries.value.deskripsi,
          currentGallaries.value.foto,
          currentGallaries.value.category_id
        ][i]
    )
  } else {
    return true
  }
})
</script>
<template>
  <div class="wrapper rounded-top-5 bg-light">
    <i class="bi bi-x-lg close" @click="$router.push({ name: 'manage_galeri' })"></i>
    <button
      v-show="!disabled && !formIsChanged"
      class="btn btn-primary save-button"
      type="button"
      @click="handleSubmit"
    >
      Save
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
      <div class="fs-3 mb-4">Edit Data Galeri</div>
      <form @submit.prevent="handleSubmit" ref="form">
        <div class="row g-3">
          <div class="col-md-6">
            <div class="row">
              <div :class="['col-md-4 col-6 ', previewFoto ? '' : 'd-none']">
                <img :src="previewFoto" class="img-fluid rounded my-ratio" />
              </div>
              <div class="col-md-8">
                <div>
                  <label for="formFile" class="form-label">Upload File</label>
                  <input
                    v-if="previewFoto"
                    class="form-control"
                    type="file"
                    id="formFile"
                    accept="image/*"
                    @change="handleFile"
                  />
                  <SkeletonLoading v-else height="40" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div>
              <label for="exampleFormControlInput1" class="form-label">Judul</label>
              <input
                v-if="judul"
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                v-model="judul"
              />
              <SkeletonLoading v-else height="40" />
            </div>
          </div>
          <div class="col-md-6">
            <label for="kategori_foto" class="form-label">Kategori Foto</label>

            <div v-if="allKategoriFoto.length > 0">
              <select
                v-model="kategoriFoto"
                class="form-select"
                id="kategori_foto"
                aria-label="Default select example"
              >
                <option value="">Pilih Salah Satu</option>
                <option v-for="ktg in allKategoriFoto" :value="ktg.id" v-text="ktg.name"></option>
              </select>
              <small class="form-text"
                >Kategori tidak ada ?
                <span class="fw-bold text-decoration-underline cursor-pointer" @click="addCategory"
                  >Tambah</span
                ></small
              >
            </div>

            <SkeletonLoading v-else height="40" />
          </div>
          <div class="col-md-6">
            <div>
              <label for="exampleFormControlTextarea1" class="form-label">Deskripsi</label>
              <textarea
                v-if="deskripsi"
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
                v-model="deskripsi"
              ></textarea>
              <SkeletonLoading v-else height="40" />
            </div>
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
