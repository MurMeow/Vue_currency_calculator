<template>
  <div id="app">
    <Nav />
    <div class="container">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from "./components/Navbar";
import Footer from "./components/Footer";

export default {
  components: {
    Nav,
    Footer
  },
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
</style>
