<script setup>
const data = [
  {
    tgl: '2022-09-26',
    judul: 'Kunjugan Presiden Joko Widodo',
    img: '1.jpg',
    deskripsi:
      'Pada 26 September 2022, Presiden Republik Indonesia, Joko Widodo, melaksanakan kunjungan resmi ke lokasi penanggulangan bencana di lokasi. Kunjungan ini dilakukan sebagai respons atas kejadian bencana jenis bencana yang telah melanda  wilayah tersebut pada tanggal bencana'
  },
  {
    tgl: '2020-07-15',
    judul: 'Vaksin Gratis',
    img: '6.jpg',
    deskripsi:
      'Penyediaan vaksin gratis diharapkan menjadi langkah strategis dalam mencapai kekebalan kelompok, melindungi masyarakat secara menyeluruh dari dampak penyakit yang dapat dicegah melalui vaksin.'
  },
  {
    tgl: '2021-05-25',
    judul: 'Pelatian P3K',
    img: '3.jpg',
    deskripsi:
      'Pelatihan P3K membekali masyarakat dengan keterampilan dan pengetahuan yang sangat penting untuk memberikan pertolongan pertama yang tepat kepada korban bencana, sehingga dapat mengurangi dampak negatif dan mendukung upaya pemulihan.'
  },
  {
    tgl: '2022-02-13',
    img: '8.jpg',
    judul: 'Pengevakuasian Korban Bencana',
    deskripsi:
      'Pihak penanggulangan bencana melakukan evakuasi dengan mempertimbangkan risiko tertinggi dan memberikan prioritas kepada kelompok yang paling rentan, seperti anak-anak, lansia, dan penyandang disabilitas.'
  }
]

function sortByDate(a, b) {
  if (a.tgl < b.tgl) {
    return 1
  }
  if (a.tgl > b.tgl) {
    return -1
  }
  return 0
}
const dataSorted = data.sort(sortByDate)
const toggleLoading = () => {
  document.querySelector('.loading').classList.toggle('close')
}
</script>
<template>
  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Portal Berita</h2>
          <ol>
            <li><router-link @click="toggleLoading" to="/">Home</router-link></li>
            <li>Berita</li>
          </ol>
        </div>
      </div>
    </section>
    <!-- End Breadcrumbs -->

    <!-- ======= Event List Section ======= -->
    <section id="event-list" class="event-list">
      <div class="container">
        <div class="row justify-content-center">
          <div
            class="col-md-6 col-lg-4 d-flex align-items-stretch"
            v-for="(d, i) in dataSorted"
            :key="i"
          >
            <div class="card shadow">
              <div class="card-img">
                <img class="img-thumbnail" :src="'/assets/hero-content/' + d.img" alt="..." />
              </div>
              <div class="card-body shadow-none">
                <h5 class="card-title" v-text="d.judul"></h5>
                <p class="fst-italic text-center" v-text="d.tgl"></p>
                <p class="card-text" v-text="d.deskripsi"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Event List Section -->
  </main>
</template>
