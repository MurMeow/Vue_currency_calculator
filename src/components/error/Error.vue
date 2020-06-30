<template>
  <div class="error">
    <div class="container ">
      <div class="block-for-error"
           @click="clearError()"
           v-on:keyup.enter="clearError()"></div>
      <div class="card-error">
        <div class="box-for-errors">
          <i
            class="material-icons white-text"
            @click="clearError()"
            v-on:keyup.enter="clearError()"
            >clear</i
          >
          <h4 class="white-text">{{ "Error" | localize }}</h4>
          <p class="white-text" v-for="error of errors" :key="error">
            {{ [error] | localize }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorBlock",
  methods: {
    clearError() {
      return this.$store.dispatch("clearOfErrors");
    }
  },
  computed: {
    errors() {
      return this.$store.getters["error"];
    }
  }
};
</script>

<style scoped>
.block-for-error {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.7;
  z-index: 5;
}
.box-for-errors {
  position: relative;
  margin: 0 auto;
  float: none;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
}
p.white-text {
  margin: 5px auto;
}
i.material-icons {
  float: right;
  cursor: pointer;
}
.card-error {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  background-color: #009688;
  min-height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 33%;
  width: 33%;
  height: max-content;
  z-index: 10;
  opacity: 1;
  margin: 5rem auto;
}
</style>
