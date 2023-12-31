<script setup>
import { computed, reactive, provide, ref, watch } from 'vue'
import axios from 'axios'
import { globalStore } from '@/stores/global'
import { useContactsStore } from '@/stores/contacts'
import { useRoute } from 'vue-router'

import Swal from 'sweetalert2'

import dayjs from '@/day.js'

const formatDate = (date) => dayjs(date).fromNow()

import SkeletonLoadingVue from '@/components/SkeletonLoading.vue'

const loopSkeleton = ref(3)

const route = useRoute()
const store = globalStore()
const storeContact = useContactsStore()

const queryPage = computed(() => route.query.page)
watch(queryPage, () => getData())
const data = reactive({
  contacts: null,
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

const setType = computed({
  get() {
    return data.activeType
  },
  set(newValue) {
    data.activeType = newValue
  }
})
const createPageNumber = (from, to) => {
  let result = []
  for (let index = from; index <= to; index++) {
    result.push(index)
  }
  data.pagination.currentPageNumber = result
}
const getPageNumber = (index) => data.pagination.currentPageNumber[index]
const loading = computed(() => data.loading)

// const contacts = computed(() =>
//   data.contacts.filter(
//     (item) =>
//       item.name.toLowerCase().indexOf(data.search.toLowerCase()) > -1 ||
//       item.email.toLowerCase().indexOf(data.search.toLowerCase()) > -1 ||
//       zeroTelp(item.telp).indexOf(data.search) > -1
//   )
// )
const contacts = computed(() => data.contacts)

const getData = async () => {
  data.loading = true
  let result = queryPage.value ? null : storeContact.userPageContacts

  if (result == null) {
    // cek apakah ada query page
    const getUrl = queryPage.value ? `/api/contacts?page=${queryPage.value}` : '/api/contacts'

    const response = await axios
      .get(getUrl)
      .then((response) => response)
      .catch((error) => error)

    result = response.data.data
  }
  data.loading = false

  storeContact.setUserPageContacts(result)

  data.contacts = result.all.data
  data.allType = result.type

  // set pagination
  data.pagination.total = result.all.total
  data.pagination.links = result.all.links
  data.pagination.prevPage = result.all.prev_page_url
  data.pagination.nextPage = result.all.next_page_url
  data.pagination.show = result.all.total > result.all.per_page

  createPageNumber(result.all.from, result.all.to)

  setType.value = data.allType.filter((item) => item.type == 'pusat')[0].slug
}
getData()

const refreshDataParentKontak = () => getData()

const handleChange = async () => {
  store.toggleLoadingAction()

  await axios.get('/sanctum/csrf-cookie')
  const result = await axios
    .post('/api/contacts/set-type', {
      slug: setType.value
    })
    .then((response) => response)
    .catch((error) => error)

  store.toggleLoadingAction()

  const { status, statusText } = result.request

  if (status == 200) {
    // berhasil
    const success = result.data

    storeContact.setUserPageContacts(null)
    refreshDataParentKontak()

    store.myAlert(true, 'success', success.message, [success.data])

    return true
  }

  const { message } = result.response.data
  store.myAlert(true, 'danger', statusText, [message])
}

const handleDelete = (data) => {
  if (setType.value == data.slug) {
    return Swal.fire({
      title: 'Oops',
      text: 'Data Kontak Pusat tidak dapat dihapus',
      icon: 'error'
    })
  }

  Swal.fire({
    title: 'Hapus Data Kontak ' + data.nama,

    showCancelButton: true,
    icon: 'question'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      processDelete(data.slug)
    }
  })
}

const processDelete = async (slug) => {
  store.toggleLoadingAction()
  await axios.get('/sanctum/csrf-cookie')
  const result = await axios
    .post(`/api/contacts/${slug}`, {
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

    storeContact.setUserPageContacts(null)
    refreshDataParentKontak()

    store.myAlert(true, 'success', success.message, [success.data])

    return true
  }

  const { message } = result.response.data
  store.myAlert(true, 'danger', statusText, [message])
}
provide('refreshDataParentKontak', refreshDataParentKontak)

let isSearching = false

const handleSearch = async () => {
  if (data.search != '') {
    store.toggleLoadingAction()
    const response = await axios
      .get('/api/contacts?search=' + data.search)
      .then((response) => response)
      .catch((error) => error)

    store.toggleLoadingAction()
    const result = response.data.data
    storeContact.setUserPageContacts(result)
    isSearching = true
    data.contacts = result.all.data
  }
}

watch(
  () => data.search,
  (newVal, oldVal) => {
    if (newVal == '' && oldVal != '') {
      if (isSearching) {
        isSearching = false
        storeContact.setUserPageContacts(null)
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
          <h2>Manage Kontak</h2>
          <ol>
            <li><router-link to="/dashboard">Dashboard</router-link></li>
            <li>Manage Kontak</li>
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
            <div class="col-md-4 col-lg-6 order-md-first order-last">
              <div class="row">
                <div class="col-4">
                  <SkeletonLoadingVue height="40" />
                </div>
                <div class="col-8">
                  <SkeletonLoadingVue height="40" />
                </div>
              </div>
            </div>
            <div class="col-md-8 col-lg-6 order-md-last order-first">
              <SkeletonLoadingVue height="40" />
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-4"><SkeletonLoadingVue height="40" /></div>
          </div>

          <SkeletonLoadingVue height="40" v-for="loop in loopSkeleton" class="mb-4" />
          <!-- <div class="row mb-4 justify-content-end">
            <div class="col-4"><SkeletonLoadingVue height="40" /></div>
          </div> -->
        </div>
        <div v-else>
          <div class="row mb-4 gy-4">
            <div class="col-md-6 order-md-first order-last d-flex gap-3 flex-nowrap">
              <router-link :to="{ name: 'addContact' }" class="btn btn-primary text-nowrap"
                >Tambah Data</router-link
              >
              <div class="input-group">
                <label class="input-group-text bg-primary-subtle" for="inputGroupSelect01"
                  >Pilih Pusat</label
                >
                <select
                  class="form-select"
                  id="inputGroupSelect01"
                  @change="handleChange"
                  v-model="setType"
                >
                  <option
                    v-for="(cb, i) in data.allType"
                    :key="i"
                    :value="cb.slug"
                    v-text="cb.name"
                  ></option>
                </select>
              </div>
            </div>
            <div class="col-md-6 order-md-last order-first">
              <div class="d-flex" role="search">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Cari Berdasarkan Nama, Email, atau NoTelp"
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
                  <th scope="col">Nama Lokasi</th>
                  <th scope="col">Tipe</th>
                  <th scope="col">Email</th>
                  <th scope="col">No Telp</th>
                  <th scope="col">Dibuat pada</th>
                  <th colspan="3" scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody v-if="contacts.length > 0">
                <tr v-for="(contact, i) in contacts" :key="i">
                  <th scope="row">{{ getPageNumber(i) }}</th>

                  <td v-text="contact.name"></td>
                  <td>
                    <span
                      v-text="contact.type"
                      :class="[
                        'btn btn-sm',
                        contact.type == 'pusat' ? 'btn-primary' : 'btn-success'
                      ]"
                    ></span>
                  </td>
                  <td v-text="contact.email"></td>
                  <td v-text="contact.telp"></td>
                  <td>{{ formatDate(contact.created_at) }}</td>
                  <td>
                    <router-link
                      :to="{ name: 'detailContact', params: { slug: contact.slug } }"
                      class="btn btn-info"
                      >Detail</router-link
                    >
                  </td>
                  <td>
                    <router-link
                      :to="{ name: 'editContact', params: { slug: contact.slug } }"
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
                          nama: contact.name,
                          slug: contact.slug
                        })
                      "
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="7">Data tidak ditemukan</td>
                </tr>
              </tbody>
            </table>
          </div>
          <nav v-show="showPagination">
            <ul class="pagination justify-content-end">
              <li :class="['page-item', prevPage == null ? 'disabled' : '']">
                <router-link
                  class="page-link"
                  :to="{ name: 'manage_kontak', query: { page: prevPage } }"
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
                  :to="{ name: 'manage_kontak', query: { page: link.label } }"
                  >{{ link.label }}</router-link
                >
              </li>

              <li :class="['page-item', nextPage == null ? 'disabled' : '']">
                <router-link
                  class="page-link"
                  :to="{ name: 'manage_kontak', query: { page: nextPage } }"
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
</style>
