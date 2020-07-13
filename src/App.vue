<template>
  <div id="app">
    <Nav />
    <ErrorBlock v-if="error.length !== 0" />
    <div class="container content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Nav from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import ErrorBlock from "./components/error/Error.vue";

export default {
  data: () => ({
    // errors: []
  }),
  components: {
    Nav,
    Footer,
    ErrorBlock
  },
  mounted() {
    // console.log(this.$route)
    // console.log(window.location.pathname)
    this.$route.path === "/" &&
      window.location.pathname !== "/converter" &&
      this.$router.push(`/currencies`);
  },
  computed: {
    error() {
      return this.$store.getters["error"];
    }
  }
  // watch: {
  //   error ({ dispatch, commit, getters }, newValue) {
  //       commit("setError", newValue);
  //   }
  // }
};
</script>

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>

<style>
#app {
  position: relative;
}
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
