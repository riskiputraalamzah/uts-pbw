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
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15823.051077486976!2d112.69268565541992!3d-7.491424799999983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7e0ca77a561e3%3A0x293c2a0584a74cd3!2sMasjid%20Baiturrahim%20Umsida%20Kampus%202!5e0!3m2!1sen!2sus!4v1699799078144!5m2!1sen!2sus"
            style="border: 0; width: 100%; height: 270px"
            allowfullscreen
            loading="lazy"
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
                  Jl. Raya Gelam No.250, Pagerwaja, Gelam, Kec. Candi, Kabupaten Sidoarjo, Jawa
                  Timur 61271, Indonesia
                </p>
              </div>

              <div class="email">
                <i class="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p>riskialamzah1@gmail.com</p>
              </div>

              <div class="phone">
                <i class="bi bi-phone"></i>
                <h4>Telp:</h4>
                <p>+62-822-3336-1877</p>
              </div>
            </div>
          </div>

          <div
            class="col-lg-7 col-md-8 mt-5 mt-lg-0 justify-content-center align-items-center d-flex flex-column"
          >
            <div class="display-5 text-center fw-bold mb-5">Hubungi Kami secara langsung !!!</div>
            <a href="https://wa.me/6282233361877" class="btn btn-success btn-large w-75">
              <i class="bi bi-telephone"></i> Klik Disini</a
            >
          </div>
        </div>
      </div>
    </section>
    <!-- End Contact Us Section -->
  </main>
</template>
