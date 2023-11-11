<script setup>
// import { onMounted } from 'vue'
// onMounted(() => {
//   const links = [
//     'assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
//     'assets/vendor/glightbox/js/glightbox.min.js',
//     'assets/vendor/isotope-layout/isotope.pkgd.min.js',
//     'assets/vendor/swiper/swiper-bundle.min.js',
//     'assets/vendor/php-email-form/validate.js',
//     'assets/js/main.js'
//   ]

//   const myScript = document.querySelector('.my-script')
//   myScript.innerHTML = ''
//   links.forEach((link) => {
//     let recaptchaScript = document.createElement('script')
//     recaptchaScript.setAttribute('src', link)
//     myScript.appendChild(recaptchaScript)
//   })
// })
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
            style="background-image: url(assets/hero-content/1.jpg)"
          ></div>

          <!-- Slide 2 -->
          <div class="carousel-item" style="background-image: url(assets/hero-content/2.jpg)"></div>
          <div class="carousel-item" style="background-image: url(assets/hero-content/3.jpg)"></div>
          <div class="carousel-item" style="background-image: url(assets/hero-content/4.jpg)"></div>
          <div class="carousel-item" style="background-image: url(assets/hero-content/5.jpg)"></div>
          <div class="carousel-item" style="background-image: url(assets/hero-content/6.jpg)"></div>
          <div class="carousel-item" style="background-image: url(assets/hero-content/7.jpg)"></div>
          <div class="carousel-item" style="background-image: url(assets/hero-content/8.jpg)"></div>
          <div class="carousel-item" style="background-image: url(assets/hero-content/9.jpg)"></div>
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

          <div class="row content">
            <div class="col-lg-6">
              <img src="assets/img/sambutan.jpeg" class="img-fluid img-thumbnail" alt="" />
            </div>
            <div class="col-lg-6 pt-4 pt-lg-0">
              <p>
                Lembaga Penanggulangan Bencana Pimpinan Pusat Muhammadiyah mengalami perubahan nama
                dengan tanpa mengurangi makna, visi dan misi lembaga yakni menjadi Lembaga
                Resiliensi Bencana Pimpinan Pusat Muhammadiyah mulai dari tahun 2022 serta memiliki
                sebutan dalam bahasa inggris “Muhammadiyah Disaster Management Center” atau
                disingkat MDMC. Lembaga ini dirintis tahun 2007 dengan nama “Pusat Penanggulangan
                Bencana” yang kemudian dikukuhkan menjadi lembaga yang bertugas mengkoordinasikan
                sumberdaya Muhammadiyah dalam kegiatan penanggulangan bencana oleh Pimpinan Pusat
                Muhammadiyah pasca Muktamar tahun 2010.
              </p>

              <p>
                MDMC bergerak dalam kegiatan penanggulangan bencana sesuai dengan definisi kegiatan
                penanggulangan bencana baik pada kegiatan Mitigasi dan Kesiapsiagaan, Tanggap
                Darurat dan juga Rehabilitasi. MDMC mengadopsi kode etik kerelawanan kemanusiaan dan
                piagam kemanusiaan yang berlaku secara internasional, mengembangkan misi pengurangan
                risiko bencana selaras dengan .....
              </p>
              <!-- <a href="our-story.html" class="btn-learn-more">Learn More</a> -->
              <router-link to="/profil" class="btn-learn-more">Lihat Selengkapnya</router-link>
            </div>
          </div>
        </div>
      </section>
      <!-- End My & Family Section -->

      <!-- ======= Features Section ======= -->
      <section id="features" class="features">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6 icon-box">
              <div class="icon"><i class="bi bi-laptop"></i></div>
              <h4 class="title"><a href="">Lorem Ipsum</a></h4>
              <p class="description">
                Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
                occaecati cupiditate non provident
              </p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box">
              <div class="icon"><i class="bi bi-bar-chart"></i></div>
              <h4 class="title"><a href="">Dolor Sitema</a></h4>
              <p class="description">
                Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat tarad limino ata
              </p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box">
              <div class="icon"><i class="bi bi-bounding-box"></i></div>
              <h4 class="title"><a href="">Sed ut perspiciatis</a></h4>
              <p class="description">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur
              </p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box">
              <div class="icon"><i class="bi bi-broadcast"></i></div>
              <h4 class="title"><a href="">Magni Dolores</a></h4>
              <p class="description">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum
              </p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box">
              <div class="icon"><i class="bi bi-camera"></i></div>
              <h4 class="title"><a href="">Nemo Enim</a></h4>
              <p class="description">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                praesentium voluptatum deleniti atque
              </p>
            </div>
            <div class="col-lg-4 col-md-6 icon-box">
              <div class="icon"><i class="bi bi-diagram-3"></i></div>
              <h4 class="title"><a href="">Eiusmod Tempor</a></h4>
              <p class="description">
                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum
                soluta nobis est eligendi
              </p>
            </div>
          </div>
        </div>
      </section>
      <!-- End Features Section -->

      <!-- ======= Recent Photos Section ======= -->
      <section id="recent-photos" class="recent-photos">
        <div class="container">
          <div class="section-title">
            <h2>Recent Photos</h2>
            <p>
              Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum
              quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui
              impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.
            </p>
          </div>

          <div class="recent-photos-slider swiper">
            <div class="swiper-wrapper align-items-center">
              <div class="swiper-slide">
                <a href="assets/img/recent-photos/recent-photos-1.jpg" class="glightbox"
                  ><img src="assets/img/recent-photos/recent-photos-1.jpg" class="img-fluid" alt=""
                /></a>
              </div>
              <div class="swiper-slide">
                <a href="assets/img/recent-photos/recent-photos-2.jpg" class="glightbox"
                  ><img src="assets/img/recent-photos/recent-photos-2.jpg" class="img-fluid" alt=""
                /></a>
              </div>
              <div class="swiper-slide">
                <a href="assets/img/recent-photos/recent-photos-3.jpg" class="glightbox"
                  ><img src="assets/img/recent-photos/recent-photos-3.jpg" class="img-fluid" alt=""
                /></a>
              </div>
              <div class="swiper-slide">
                <a href="assets/img/recent-photos/recent-photos-4.jpg" class="glightbox"
                  ><img src="assets/img/recent-photos/recent-photos-4.jpg" class="img-fluid" alt=""
                /></a>
              </div>
              <div class="swiper-slide">
                <a href="assets/img/recent-photos/recent-photos-5.jpg" class="glightbox"
                  ><img src="assets/img/recent-photos/recent-photos-5.jpg" class="img-fluid" alt=""
                /></a>
              </div>
              <div class="swiper-slide">
                <a href="assets/img/recent-photos/recent-photos-6.jpg" class="glightbox"
                  ><img src="assets/img/recent-photos/recent-photos-6.jpg" class="img-fluid" alt=""
                /></a>
              </div>
              <div class="swiper-slide">
                <a href="assets/img/recent-photos/recent-photos-7.jpg" class="glightbox"
                  ><img src="assets/img/recent-photos/recent-photos-7.jpg" class="img-fluid" alt=""
                /></a>
              </div>
              <div class="swiper-slide">
                <a href="assets/img/recent-photos/recent-photos-8.jpg" class="glightbox"
                  ><img src="assets/img/recent-photos/recent-photos-8.jpg" class="img-fluid" alt=""
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
