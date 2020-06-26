<template>
  <div id="app">
    <Nav />
    <Loader v-if='isLoading'/>
    <div class="container" v-else>
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

export default {
  components: {
    Nav,
    Footer,
    Loader
  },
  computed: {
    isLoading() {
      return this.$store.getters["isLoading"];
    },
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
</style>
