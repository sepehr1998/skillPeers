<template>
  <div class="main-view-container">
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="min-height: 100px; background-size: cover; background-position: center top;"
    >
      <!-- Mask -->
      <span class="mask bg-gradient-primary opacity-8"></span>
    </base-header>

    <div class="container-fluid mt--7 mb-7">
      <div class="row justify-content-center ">
        <img
          class="under-construction-image "
          src="@/assets/underconstruction/website-under-construction.png"
          alt="UnderConstruction"
          width="50%"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.under-construction-image {
  z-index: 10;
}
.main-view-container {
  min-height: calc(100vh - 55px);
  margin-bottom: 80px;
}
</style>
