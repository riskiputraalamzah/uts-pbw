<script setup>
import { computed, reactive, provide, ref, watch } from 'vue'
import axios from 'axios'
import { globalStore } from '@/stores/global'
import { useGalleryStore } from '@/stores/gallery'
import { useRoute } from 'vue-router'

import Swal from 'sweetalert2'

import dayjs from '@/day.js'

const formatDate = (date) => dayjs(date).fromNow()

import SkeletonLoadingVue from '@/components/SkeletonLoading.vue'

const loopSkeleton = ref(3)

const route = useRoute()
const store = globalStore()
const galleryStore = useGalleryStore()

const queryPage = computed(() => route.query.page)
watch(queryPage, () => getData())
const data = reactive({
  gallaries: null,
  loading: true,
  search: '',
  activeType: null,
  allType: null,
  pagination: {
    show: false,
    total: 0,
    prevPage: null,
    nextPage: null,

    links: [],
    currentPageNumber: []
  }
})
const showPagination = computed(() => data.pagination.show)
const links = computed(() =>
  data.pagination.links.filter((item, i) => i != 0 && i != data.pagination.links.length - 1)
)
const prevPage = computed(() =>
  data.pagination.prevPage != null ? data.pagination.prevPage.split('page=')[1] : null
)
const nextPage = computed(() =>
  data.pagination.nextPage != null ? data.pagination.nextPage.split('page=')[1] : null
)

const createPageNumber = (from, to) => {
  let result = []
  for (let index = from; index <= to; index++) {
    result.push(index)
  }
  data.pagination.currentPageNumber = result
}
const getPageNumber = (index) => data.pagination.currentPageNumber[index]
const loading = computed(() => data.loading)

const gallaries = computed(() => data.gallaries)

const getData = async () => {
  data.loading = true
  let result = queryPage.value ? null : galleryStore.userPageGallaries

  if (result == null) {
    // cek apakah ada query page
    const getUrl = queryPage.value ? `/api/gallery?page=${queryPage.value}` : '/api/gallery'

    const response = await axios
      .get(getUrl)
      .then((response) => response)
      .catch((error) => error)

    result = response.data.data
  }
  data.loading = false

  galleryStore.setUserPageGallaries(result)

  data.gallaries = result.data

  // set pagination
  data.pagination.total = result.total
  data.pagination.links = result.links
  data.pagination.prevPage = result.prev_page_url
  data.pagination.nextPage = result.next_page_url
  data.pagination.show = result.total > result.per_page

  createPageNumber(result.from, result.to)
}
getData()

const refreshDataParentGaleri = () => getData()

const handleDelete = (data) => {
  Swal.fire({
    title: 'Hapus Data Galeri ' + data.nama,

    showCancelButton: true,
    icon: 'question'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      processDelete(data.id)
    }
  })
}

const processDelete = async (slug) => {
  store.toggleLoadingAction()
  await axios.get('/sanctum/csrf-cookie')
  const result = await axios
    .post(`/api/gallery/${slug}`, {
      slug: data.slug,
      _method: 'DELETE'
    })
    .then((response) => response)
    .catch((error) => error)
  store.toggleLoadingAction()

  const { status, statusText } = result.request

  if (status == 200) {
    // berhasil
    const success = result.data

    galleryStore.setUserPageGallaries(null)
    refreshDataParentGaleri()

    store.myAlert(true, 'success', success.message, [success.data])

    return true
  }

  const { message } = result.response.data
  store.myAlert(true, 'danger', statusText, [message])
}
provide('refreshDataParentGaleri', refreshDataParentGaleri)

let isSearching = false

const handleSearch = async () => {
  if (data.search != '') {
    store.toggleLoadingAction()

    const response = await axios
      .get('/api/gallery?search=' + data.search)
      .then((response) => response)
      .catch((error) => error)

    store.toggleLoadingAction()

    const result = response.data.data
    galleryStore.setUserPageGallaries(result)
    isSearching = true
    data.gallaries = result.data
  }
}

watch(
  () => data.search,
  (newVal, oldVal) => {
    if (newVal == '' && oldVal != '') {
      if (isSearching) {
        isSearching = false
        galleryStore.setUserPageGallaries(null)
        getData()
      }
    }
  }
)
</script>
<template>
  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Manage Galeri</h2>
          <ol>
            <li><router-link to="/dashboard">Dashboard</router-link></li>
            <li>Manage Galeri</li>
          </ol>
        </div>
      </div>
    </section>
    <!-- End Breadcrumbs -->

    <!-- ======= Story Intro Section ======= -->
    <section class="overflow-hidden">
      <div class="container position-relative">
        <div v-if="loading">
          <div class="row mb-4 gy-4">
            <div class="col-md-6 order-md-first order-last">
              <div class="row">
                <div class="col-12">
                  <SkeletonLoadingVue height="50" />
                </div>
              </div>
            </div>
            <div class="col-md-6 order-md-last order-first">
              <SkeletonLoadingVue height="50" />
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-4"><SkeletonLoadingVue height="50" /></div>
          </div>
          <SkeletonLoadingVue height="50" v-for="loop in loopSkeleton" class="mb-4" />
        </div>
        <div v-else>
          <div class="row mb-4 gy-4">
            <div class="col-md-6 order-md-first order-last d-flex gap-3 flex-nowrap">
              <router-link :to="{ name: 'addGaleri' }" class="btn btn-primary text-nowrap"
                >Tambah Data</router-link
              >
            </div>
            <div class="col-md-6 order-md-last order-first">
              <div class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Cari Data"
                  aria-label="Search"
                  v-model="data.search"
                  @keypress.enter="handleSearch"
                />
              </div>
            </div>
          </div>
          <div class="mb-4">
            <div class="fw-bold">Total Data : {{ data.pagination.total }}</div>
          </div>
          <div class="table-responsive mb-4">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Judul</th>
                  <th scope="col">Kategori</th>
                  <th scope="col">Dibuat pada</th>
                  <th colspan="3" scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(gallery, i) in gallaries" :key="i">
                  <th scope="row">{{ getPageNumber(i) }}</th>
                  <td>
                    <img
                      loading="lazy"
                      v-lazy="{
                        src: gallery.foto,
                        delay: 500
                      }"
                      :src="gallery.foto"
                      alt="foto"
                      class="rounded object-fit-contain"
                    />
                  </td>
                  <td v-text="gallery.judul"></td>
                  <td v-text="gallery.category.name"></td>

                  <td>{{ formatDate(gallery.created_at) }}</td>
                  <td>
                    <router-link
                      :to="{ name: 'detailGaleri', params: { id: gallery.id } }"
                      class="btn btn-info"
                      >Detail</router-link
                    >
                  </td>
                  <td>
                    <router-link
                      :to="{ name: 'editGaleri', params: { id: gallery.id } }"
                      class="btn btn-warning"
                      >Edit</router-link
                    >
                  </td>
                  <td>
                    <button
                      class="btn btn-danger"
                      type="button"
                      @click="
                        handleDelete({
                          nama: gallery.judul,
                          id: gallery.id
                        })
                      "
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav v-show="showPagination">
            <ul class="pagination justify-content-end">
              <li :class="['page-item', prevPage == null ? 'disabled' : '']">
                <router-link
                  class="page-link"
                  :to="{ name: 'manage_galeri', query: { page: prevPage } }"
                  >Previous</router-link
                >
              </li>

              <li
                v-for="(link, i) in links"
                :class="['page-item', link.active ? 'active' : '']"
                :key="i"
              >
                <router-link
                  class="page-link"
                  :disabled="link.active"
                  :to="{ name: 'manage_galeri', query: { page: link.label } }"
                  >{{ link.label }}</router-link
                >
              </li>

              <li :class="['page-item', nextPage == null ? 'disabled' : '']">
                <router-link
                  class="page-link"
                  :to="{ name: 'manage_galeri', query: { page: nextPage } }"
                  >Next</router-link
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>

    <router-view v-slot="{ Component }">
      <transition name="scale">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style scoped>
th,
td {
  vertical-align: middle;
  text-align: center;
  text-wrap: nowrap;
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease-in-out;
}

.scale-enter-from,
.scale-leave-to {
  transform: translateY(100%);
}
table img {
  object-fit: cover;
  aspect-ratio: 4/3;
  width: 100px;
}
</style>
