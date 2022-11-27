<template>
  <div>
    <header-nav-bar></header-nav-bar>

    <!-- Header -->
    <header id="header" class="header">
      <div class="header-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-xl-5">
              <div class="text-container">
                <h2 class="text-white mb-3">BUY and SELL your skills at Skill Peers</h2>
                <h5 class="text-white mb-3">Registration is free and easy</h5>
                <a
                  class="btn-solid-lg page-scroll cursor-pointer"
                  @click="goToProfile"
                >POST/LOOK UP THE SKILL</a>
              </div>
              <!-- end of text-container -->
            </div>
            <!-- end of col -->
            <div class="col-lg-6 col-xl-7">
              <div class="image-container">
                <div class="img-wrapper" style="max-width: 100%; align-content: center">
                  <img
                    class="img-fluid"
                    src="@/assets/home_images/header-final.png"
                    alt="alternative"
                  />
                </div>
                <!-- end of img-wrapper -->
              </div>
              <!-- end of image-container -->
            </div>
            <!-- end of col -->
          </div>
          <!-- end of row -->
        </div>
        <!-- end of container -->
      </div>
      <!-- end of header-content -->
    </header>
    <!-- end of header -->
<!--    <svg-->
<!--      class="header-frame"-->
<!--      data-name="Layer 1"-->
<!--      xmlns="http://www.w3.org/2000/svg"-->
<!--      preserveAspectRatio="none"-->
<!--      viewBox="0 0 1920 310"-->
<!--    >-->
<!--      <title>header-frame</title>-->
<!--      <path-->
<!--        class="cls-1"-->
<!--        d="M0,283.054c22.75,12.98,53.1,15.2,70.635,14.808,92.115-2.077,238.3-79.9,354.895-79.938,59.97-.019,106.17,18.059,141.58,34,47.778,21.511,47.778,21.511,90,38.938,28.418,11.731,85.344,26.169,152.992,17.971,68.127-8.255,115.933-34.963,166.492-67.393,37.467-24.032,148.6-112.008,171.753-127.963,27.951-19.26,87.771-81.155,180.71-89.341,72.016-6.343,105.479,12.388,157.434,35.467,69.73,30.976,168.93,92.28,256.514,89.405,100.992-3.315,140.276-41.7,177-64.9V0.24H0V283.054Z"-->
<!--      />-->
<!--    </svg>-->
    <!-- end of header -->
  </div>
</template>
<script>
import HeaderNavBar from "./header-nav-bar";

export default {
  name: "HomeHeader",
  components: {
    HeaderNavBar,
  },
  methods: {
    goToProfile() {
      this.$router.push("/profile");
    },
  },
};
</script>
<style lang="scss" scoped>
.cls-1 {
  fill: #5f4dee ;
}

.cursor-pointer {
  cursor: pointer;
}


.login-info{
  text-align: center;
  align-content: center;
}
</style>