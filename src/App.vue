<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700&display=swap&subset=latin-ext");
@import url("https://fonts.googleapis.com/css?family=Roboto");
html,
body {
  font-family: "Roboto", sans-serif;
}
#app {
  font-family: "Roboto", sans-serif;
}
</style>
