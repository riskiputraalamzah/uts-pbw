<script setup>
const copy = () => {
  const date = '2023'
  const nowDate = new Date().getFullYear()

  return nowDate == date ? nowDate : date + '-' + nowDate
}
</script>
<template>
  <footer id="footer">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-8">
          <img src="/assets/img/logo-web.png" alt="" class="img-fluid" />
        </div>
      </div>
      <h3>"Together for Humanity"</h3>
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
        Develop by <a href="https://s.id/alamzah">Putra :) </a>
      </div>
    </div>
  </footer>
</template>
