<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const links = [
    'assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
    'assets/vendor/glightbox/js/glightbox.min.js',
    'assets/vendor/isotope-layout/isotope.pkgd.min.js',
    'assets/vendor/swiper/swiper-bundle.min.js',
    'assets/vendor/php-email-form/validate.js',
    'assets/js/main.js'
  ]

  const myScript = document.querySelector('.my-script')
  myScript.innerHTML = ''
  links.forEach((link) => {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', link)
    myScript.appendChild(recaptchaScript)
  })
})
</script>
<template>
  <main id="main">
    <!-- ======= Breadcrumbs ======= -->
    <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <h2>Galeri</h2>
          <ol>
            <li><router-link to="/">Home</router-link></li>
            <li>Galeri</li>
          </ol>
        </div>
      </div>
    </section>
    <!-- End Breadcrumbs -->

    <!-- ======= Gallery Section ======= -->
    <section id="gallery" class="gallery">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 d-flex justify-content-center">
            <ul id="gallery-flters">
              <li data-filter="*" class="filter-active">All</li>
              <li data-filter=".filter-palestine">#palestine</li>
              <li data-filter=".filter-politik">politik</li>
              <li data-filter=".filter-justice">justice</li>
            </ul>
          </div>
        </div>

        <div class="row gallery-container">
          <div class="col-lg-4 col-md-6 gallery-item filter-palestine">
            <div class="gallery-wrap">
              <img src="/assets/hero-content/1.jpg" class="img-fluid" alt="" />
              <div class="gallery-info">
                <h4>Home 1</h4>
                <p>Home</p>
                <div class="gallery-links">
                  <a href="/assets/hero-content/1.jpg" class="glightbox" title="Home 1"
                    ><i class="bx bx-plus"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 gallery-item filter-justice">
            <div class="gallery-wrap">
              <img src="/assets/hero-content/2.jpg" class="img-fluid" alt="" />
              <div class="gallery-info">
                <h4>Vacation 2</h4>
                <p>Vacation</p>
                <div class="gallery-links">
                  <a href="/assets/hero-content/2.jpg" class="glightbox" title="Vacation 2"
                    ><i class="bx bx-plus"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 gallery-item filter-palestine">
            <div class="gallery-wrap">
              <img src="/assets/hero-content/3.jpg" class="img-fluid" alt="" />
              <div class="gallery-info">
                <h4>Home 2</h4>
                <p>Home</p>
                <div class="gallery-links">
                  <a href="/assets/hero-content/3.jpg" class="glightbox" title="Home 2"
                    ><i class="bx bx-plus"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 gallery-item filter-politik">
            <div class="gallery-wrap">
              <img src="/assets/hero-content/4.jpg" class="img-fluid" alt="" />
              <div class="gallery-info">
                <h4>Beach 2</h4>
                <p>Beach</p>
                <div class="gallery-links">
                  <a href="/assets/hero-content/4.jpg" class="glightbox" title="Beach 2"
                    ><i class="bx bx-plus"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 gallery-item filter-justice">
            <div class="gallery-wrap">
              <img src="/assets/hero-content/5.jpg" class="img-fluid" alt="" />
              <div class="gallery-info">
                <h4>Vacation 1</h4>
                <p>Vacation</p>
                <div class="gallery-links">
                  <a href="/assets/hero-content/5.jpg" class="glightbox" title="Vacation 1"
                    ><i class="bx bx-plus"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 gallery-item filter-palestine">
            <div class="gallery-wrap">
              <img src="/assets/hero-content/6.jpg" class="img-fluid" alt="" />
              <div class="gallery-info">
                <h4>Home 3</h4>
                <p>Home</p>
                <div class="gallery-links">
                  <a href="/assets/hero-content/6.jpg" class="glightbox" title="Home 3"
                    ><i class="bx bx-plus"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 gallery-item filter-politik">
            <div class="gallery-wrap">
              <img src="/assets/hero-content/7.jpg" class="img-fluid" alt="" />
              <div class="gallery-info">
                <h4>Beach 1</h4>
                <p>Beach</p>
                <div class="gallery-links">
                  <a href="/assets/hero-content/7.jpg" class="glightbox" title="Beach 1"
                    ><i class="bx bx-plus"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 gallery-item filter-politik">
            <div class="gallery-wrap">
              <img src="/assets/hero-content/8.jpg" class="img-fluid" alt="" />
              <div class="gallery-info">
                <h4>Beach 3</h4>
                <p>Beach</p>
                <div class="gallery-links">
                  <a href="/assets/hero-content/8.jpg" class="glightbox" title="Beach 3"
                    ><i class="bx bx-plus"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 gallery-item filter-justice">
            <div class="gallery-wrap">
              <img src="/assets/hero-content/9.jpg" class="img-fluid" alt="" />
              <div class="gallery-info">
                <h4>Vacation 3</h4>
                <p>Vacation</p>
                <div class="gallery-links">
                  <a href="/assets/hero-content/9.jpg" class="glightbox" title="Vacation 3"
                    ><i class="bx bx-plus"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Gallery Section -->
  </main>
</template>
