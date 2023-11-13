<script setup>
import { onMounted } from 'vue'
const toggleLoading = () => {
  document.querySelector('.loading').classList.toggle('close')
}

onMounted(() => {
  const myScript = document.querySelector('.my-script')
  myScript.innerHTML = ''
  let recaptchaScript = document.createElement('script')
  recaptchaScript.setAttribute('src', '/assets/js/main.js')
  recaptchaScript.setAttribute('defer', true)
  myScript.appendChild(recaptchaScript)
})
</script>
<template>
  <div>
    <!-- ======= Header ======= -->

    <!-- End Header -->

    <!-- ======= Hero Section ======= -->
    <section id="hero">
      <div
        id="heroCarousel"
        data-bs-interval="5000"
        class="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>

        <div class="carousel-inner" role="listbox">
          <!-- Slide 1 -->
          <div
            class="carousel-item active"
            style="background-image: url(/assets/hero-content/1.jpg)"
          ></div>

          <!-- Slide 2 -->
          <div
            class="carousel-item"
            style="background-image: url(/assets/hero-content/2.jpg)"
          ></div>
          <div
            class="carousel-item"
            style="background-image: url(/assets/hero-content/3.jpg)"
          ></div>
          <div
            class="carousel-item"
            style="background-image: url(/assets/hero-content/4.jpg)"
          ></div>
          <div
            class="carousel-item"
            style="background-image: url(/assets/hero-content/5.jpg)"
          ></div>
          <div
            class="carousel-item"
            style="background-image: url(/assets/hero-content/6.jpg)"
          ></div>
          <div
            class="carousel-item"
            style="background-image: url(/assets/hero-content/7.jpg)"
          ></div>
          <div
            class="carousel-item"
            style="background-image: url(/assets/hero-content/8.jpg)"
          ></div>
          <div
            class="carousel-item"
            style="background-image: url(/assets/hero-content/9.jpg)"
          ></div>
        </div>

        <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
          <span class="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
        </a>

        <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
          <span class="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
        </a>
      </div>
    </section>
    <!-- End Hero -->

    <main id="main">
      <!-- ======= My & Family Section ======= -->

      <section id="about" class="about">
        <div class="container">
          <div class="section-title">
            <h2>Sambutan</h2>
            <p>
              Budi Setiawan, Ketua Lembaga Resiliensi Bencana (MDMC) Pimpinan Pusat Muhammadiyah
              2022 – 2027
            </p>
          </div>

          <div class="row content align-items-center">
            <div class="col-lg-6">
              <img src="/assets/img/sambutan.jpeg" class="img-fluid img-thumbnail" alt="" />
            </div>
            <div class="col-lg-6 pt-4 pt-lg-0">
              <p>
                Lembaga Penanggulangan Bencana Pimpinan Pusat Muhammadiyah mengalami perubahan nama
                dengan tanpa mengurangi makna, visi dan misi lembaga yakni menjadi Lembaga
                Resiliensi Bencana Pimpinan Pusat Muhammadiyah mulai dari tahun 2022 serta memiliki
                sebutan dalam bahasa inggris “Muhammadiyah Disaster Management Center” atau
                disingkat MDMC. Lembaga ini dirintis tahun 2007 dengan nama “Pusat Penanggulangan
                Bencana” yang kemudian dikukuhkan menjadi lembaga yang...
              </p>

              <!-- <a href="our-story.html" class="btn-learn-more">Learn More</a> -->
              <router-link to="/profil" @click="toggleLoading" class="btn-learn-more"
                >Lihat Selengkapnya</router-link
              >
            </div>
          </div>
        </div>
      </section>
      <!-- End My & Family Section -->

      <section>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8 text-center">
              <div class="my-border">
                <div class="display-1 text-center fw-bold">Apa itu MDMC ❓</div>
                <img src="/assets/img/og.png" alt="" class="img-fluid rounded mt-5" />
                <p class="mt-5">
                  Muhammadiyah Disaster Management Center (MDMC) adalah sebutan dalam bahasa inggris
                  dari Lembaga Penanggulangan Bencana Muhammadiyah yang merupakan salah satu unsur
                  pembantu pimpinan Persyarikatan Muhammadiyah pada tingkat Pusat (Nasional),
                  Wilayah (Provinsi) dan Daerah (Kabupaten) se Indonesia. Saat ini Lembaga
                  Penanggulangan Bencana beralih nama dengan tanpa merubah visi dan misinya menjadi
                  Lembaga Resilliensi Bencana sebagaiman Surat Keputusan Pimpinan Pusat Muhammadiyah
                  nomor 153/KEP/I.0/D/2023 tentang Pengangkatan Pimpinan dan Anggota Lembaga
                  Resiliensi Bencana Pimpinan Pusat Muhammadiyah Periode 2022-2027.
                </p>
                <router-link to="/profil" @click="toggleLoading" class="btn btn-outline-primary"
                  >Baca Selengkapnya</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ======= Features Section ======= -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#1d284b"
          fill-opacity="1"
          d="M0,96L60,128C120,160,240,224,360,208C480,192,600,96,720,80C840,64,960,128,1080,176C1200,224,1320,256,1380,272L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
      <section id="features" style="margin: -10px 0" class="features bg-my-primary text-light">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 icon-box">
              <div class="icon"><i class="bi bi-truck"></i></div>
              <h4 class="title">
                <a href="" class="pointer-none text-light">Bantuan Kemanusian</a>
              </h4>
              <p class="description">
                Tanggap Darurat - Rehabilitasi Rekonstruksi dalam sistem One Muhammadiyah One
                Response sesuai prinsip - prinsip kemanusiaan
              </p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box">
              <div class="icon"><i class="bi bi-person-hearts"></i></div>
              <h4 class="title"><a href="" class="pointer-none text-light">Mitigasi Bencana</a></h4>
              <p class="description">
                Bekerja bersama sekolah, rumah sakit, pelajar, pemuda, perempuan, komunitas, media
                dan pemerintah menciptakan masyarakat tangguh.
              </p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box">
              <div class="icon"><i class="bi bi-bookmark-heart"></i></div>
              <h4 class="title"><a href="" class="pointer-none text-light">Penguatan Sistem</a></h4>
              <p class="description">
                Manajemen kerelawanan, penguatan organisasi, pengembangan kerjasama & jaringan
                memperkuat sistem PB di Indonesia
              </p>
            </div>
          </div>
        </div>
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#1d284b"
          fill-opacity="1"
          d="M0,96L60,128C120,160,240,224,360,208C480,192,600,96,720,80C840,64,960,128,1080,176C1200,224,1320,256,1380,272L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
      <!-- End Features Section -->

      <!-- ======= Recent Photos Section ======= -->

      <section id="recent-photos" class="recent-photos">
        <div class="container">
          <div class="section-title">
            <h2>Dokumentasi Kegiatan</h2>
            <p>Berikut beberapa dokumentasi selama kegiatan berlangsung</p>
          </div>

          <div class="recent-photos-slider swiper">
            <div class="swiper-wrapper align-items-center">
              <div class="swiper-slide">
                <a href="/assets/hero-content/1.jpg" class="glightbox"
                  ><img src="/assets/hero-content/1.jpg" class="img-fluid" alt=""
                /></a>
              </div>
              <div class="swiper-slide">
                <a href="/assets/hero-content/2.jpg" class="glightbox"
                  ><img src="/assets/hero-content/2.jpg" class="img-fluid" alt=""
                /></a>
              </div>
              <div class="swiper-slide">
                <a href="/assets/hero-content/3.jpg" class="glightbox"
                  ><img src="/assets/hero-content/3.jpg" class="img-fluid" alt=""
                /></a>
              </div>
              <div class="swiper-slide">
                <a href="/assets/hero-content/4.jpg" class="glightbox"
                  ><img src="/assets/hero-content/4.jpg" class="img-fluid" alt=""
                /></a>
              </div>
              <div class="swiper-slide">
                <a href="/assets/hero-content/5.jpg" class="glightbox"
                  ><img src="/assets/hero-content/5.jpg" class="img-fluid" alt=""
                /></a>
              </div>
              <div class="swiper-slide">
                <a href="/assets/hero-content/6.jpg" class="glightbox"
                  ><img src="/assets/hero-content/6.jpg" class="img-fluid" alt=""
                /></a>
              </div>
              <div class="swiper-slide">
                <a href="/assets/hero-content/7.jpg" class="glightbox"
                  ><img src="/assets/hero-content/7.jpg" class="img-fluid" alt=""
                /></a>
              </div>
              <div class="swiper-slide">
                <a href="/assets/hero-content/8.jpg" class="glightbox"
                  ><img src="/assets/hero-content/8.jpg" class="img-fluid" alt=""
                /></a>
              </div>
              <div class="swiper-slide">
                <a href="/assets/hero-content/9.jpg" class="glightbox"
                  ><img src="/assets/hero-content/9.jpg" class="img-fluid" alt=""
                /></a>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </section>
      <!-- End Recent Photos Section -->
    </main>
    <!-- End #main -->

    <!-- ======= Footer ======= -->

    <!-- End Footer -->

    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"
      ><i class="bi bi-arrow-up-short"></i
    ></a>
  </div>
</template>
