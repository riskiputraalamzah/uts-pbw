<script setup>
const copy = () => {
  const date = '2023'
  const nowDate = new Date().getFullYear()

  return nowDate == date ? nowDate : date + '-' + nowDate
}
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path
      fill="#1d284b"
      fill-opacity="1"
      d="M0,192L80,176C160,160,320,128,480,133.3C640,139,800,181,960,176C1120,171,1280,117,1360,90.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
    ></path>
  </svg>
  <footer id="footer">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-8">
          <img src="/assets/img/logo-web.png" alt="" class="img-fluid" />
        </div>
      </div>
      <div class="fs-1 fw-bold mb-3">"Together for Humanity"</div>
      <p>
        Muhammadiyah Disaster Management Center (MDMC) adalah sebutan dalam bahasa inggris dari
        Lembaga Penanggulangan Bencana Muhammadiyah yang merupakan salah satu unsur pembantu
        pimpinan Persyarikatan Muhammadiyah pada tingkat Pusat (Nasional), Wilayah (Provinsi) dan
        Daerah (Kabupaten) se Indonesia
      </p>
      <!-- <div class="social-links">
        <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
        <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
        <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
        <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
        <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>
      </div> -->
      <div class="copyright">
        &copy; Copyright
        <strong
          ><span>{{ copy() }}</span></strong
        >. All Rights Reserved
      </div>
      <div class="credits">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/family-multipurpose-html-bootstrap-template-free/ -->
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
      <div class="credits">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/family-multipurpose-html-bootstrap-template-free/ -->
        Develop by <a href="https://s.id/alamzah">Putra 😄✌️</a>
      </div>
    </div>
    <a href="#" class="back-to-top pointer-none d-flex align-items-center justify-content-center"
      ><i class="bi bi-arrow-up-short"></i
    ></a>
  </footer>
</template>

<style scoped>
footer {
  margin-top: -5px;
}
</style>
