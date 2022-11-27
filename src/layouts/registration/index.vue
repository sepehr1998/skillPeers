<template>
    <div class="main-container">
      <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");
.main-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}


@media only screen and (max-width: 600px) {
  .main-container {
    height: 100%;
  }
}
</style>