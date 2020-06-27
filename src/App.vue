<template>
  <div id="app">
    <Nav />
    <div class="container content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from "./layout/header/Header";
import Footer from "./layout/footer/Footer";

export default {
  components: {
    Nav,
    Footer
  },
  mounted() {
    this.$route.path === '/' && this.$router.push(`/currencies`)
  }
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>

<style>
.container {
  width: 80%;
  margin: 0 auto;
}
.content {
  min-height: calc(100vh - 114px);
}
.flex {
  display: flex;
  justify-content: space-between;
}
</style>
