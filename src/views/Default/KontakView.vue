<script setup>
import { computed, reactive } from 'vue'
import axios from 'axios'

import { useContactsStore } from '../../stores/contacts'

import SkeletonLoadingVue from '@/components/SkeletonLoading.vue'

const store = useContactsStore()

const data = reactive({
  contacts: null,
  loading: true
})

const pusat = computed(() => data.contacts.filter((x) => x.type == 'pusat')[0])
const cabang = computed(() => data.contacts.filter((x) => x.type == 'cabang'))
const loading = computed(() => data.loading)

const getData = async () => {
  let result = store.userPageContacts

  if (result == null) {
    const response = await axios
      .get('/api/contacts')
      .then((response) => response)
      .catch((error) => error)

    result = response.data.data
  }
  data.loading = !data.loading

  store.setUserPageContacts(result)
  data.contacts = result.all.data
  console.log(result)
}
getData()

const formatTelp = (telp) => '62' + telp
</script>
<template>
  <main id="main">
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Kontak Kami</h2>
          <ol>
            <li><router-link to="/">Home</router-link></li>
            <li>Kontak Kami</li>
          </ol>
        </div>
      </div>
    </section>

    <section id="contact-us" class="contact-us">
      <div class="container">
        <div v-if="loading">
          <div>
            <SkeletonLoadingVue height="270" />
          </div>

          <div class="row mt-5">
            <div class="col-lg-5 col-md-4">
              <div class="info">
                <SkeletonLoadingVue height="70" />
                <br />
                <SkeletonLoadingVue height="70" />
                <br />
                <SkeletonLoadingVue height="70" />
              </div>
            </div>

            <div
              class="col-lg-7 col-md-8 mt-5 mt-lg-0 justify-content-center align-items-center d-flex flex-column"
            >
              <SkeletonLoadingVue height="260" />
            </div>
          </div>
          <div class="mt-5">
            <SkeletonLoadingVue height="50" /><br />
            <SkeletonLoadingVue height="50" /><br />
            <SkeletonLoadingVue height="50" /><br />
          </div>
        </div>

        <div v-else>
          <div>
            <iframe
              :src="pusat.map"
              style="border: 0; width: 100%; height: 270px"
              allowfullscreen
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div class="row mt-5">
            <div class="col-lg-5 col-md-4">
              <div class="info">
                <div class="address">
                  <i class="bi bi-geo-alt"></i>
                  <h4>Lokasi:</h4>
                  <p>
                    {{ pusat.lokasi }}
                  </p>
                </div>

                <div class="email">
                  <i class="bi bi-envelope"></i>
                  <h4>Email:</h4>
                  <p>{{ pusat.email }}</p>
                </div>

                <div class="phone">
                  <i class="bi bi-phone"></i>
                  <h4>Telp:</h4>
                  <p>{{ '0' + pusat.telp }}</p>
                </div>
              </div>
            </div>

            <div
              class="col-lg-7 col-md-8 mt-5 mt-lg-0 justify-content-center align-items-center d-flex flex-column"
            >
              <div class="display-5 text-center fw-bold mb-5">Hubungi Kami secara langsung !!!</div>
              <div class="row text-center">
                <div class="col-6">
                  <a
                    style="white-space: nowrap"
                    :href="`mailto:${pusat.email}`"
                    class="btn btn-danger btn-large"
                  >
                    <i class="bi bi-envelope"></i><br />Kirim Surel</a
                  >
                </div>
                <div class="col-6">
                  <a
                    style="white-space: nowrap"
                    :href="`https://wa.me/${formatTelp(pusat.telp)}`"
                    class="btn btn-success btn-large"
                  >
                    <i class="bi bi-telephone"></i><br />Klik Disini</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="section-title mt-5 mb-2">
            <h2>Cabang Kami</h2>
            <p>Berikut cabang lokasi MDMC</p>
          </div>
          <div class="accordion row g-3 rounded-0" id="accordionExample">
            <div
              class="accordion-item col-md-6 border-0 rounded-0"
              v-for="(cb, i) in cabang"
              :key="i"
            >
              <h4 class="accordion-header">
                <button
                  class="accordion-button collapsed fs-5 fw-bold rounded-0"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#collapse${i}`"
                  aria-expanded="true"
                  :aria-controls="`collapse${i}`"
                >
                  {{ cb.name }}
                </button>
              </h4>
              <div :id="`collapse${i}`" class="accordion-collapse collapse">
                <div class="accordion-body p-0 pt-4">
                  <iframe
                    :src="cb.map"
                    style="border: 0; width: 100%; height: 200px"
                    allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <div class="info mt-2 fs-6">
                    <div class="address">
                      <i class="bi bi-geo-alt"></i>
                      <h4>Lokasi:</h4>
                      <p>
                        {{ cb.lokasi }}
                      </p>
                    </div>

                    <div class="email">
                      <i class="bi bi-envelope"></i>
                      <h4>Email:</h4>
                      <p>
                        <a
                          :href="`mailto:${cb.email}`"
                          class="text-decoration-underline"
                          v-text="cb.email"
                        >
                        </a>
                      </p>
                    </div>

                    <div class="phone">
                      <i class="bi bi-phone"></i>
                      <h4>Telp:</h4>
                      <p>
                        <a
                          :href="`https://wa.me/${formatTelp(cb.telp)}`"
                          class="text-decoration-underline"
                          v-text="'0' + cb.telp"
                        >
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
