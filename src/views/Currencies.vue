<template>
  <Loader v-if="loading" />
  <div v-else>
    <ul class="collection">
      <li
      v-for="cur of favoriteCurrencyRates"
      :key="cur.curId"
       >
        <CurrencyDetails :currency='cur' />
      </li>

      <li
        v-for="otherCur of otherCurrencyRates"
        :key="otherCur.curId"
      >
        <CurrencyDetails :currency='otherCur'/>
      </li>
    </ul>
  </div>
</template>

<script>
import Loader from "../components/spinner/Spinner";
import CurrencyDetails from "../components/currencyDetails/CurrencyDetails";

export default {
  name: "Currencies",
  components: { Loader, CurrencyDetails },
  data: () => ({
    loading: true,
    currency: {}
  }),

  async mounted() {
    this.currenciesAll == null &&
      (await this.$store.dispatch("fetchCurrencies"));
    this.currencyRates == null &&
      (await this.$store.dispatch("fetchCurrencyRates"));
    this.loading = false;
  },

  computed: {
    currenciesAll() {
      return this.$store.getters["currenciesAll"];
    },
    currencyRates() {
      return this.$store.getters["currencyRates"];
    },
    favoriteCurrencyRates: function() {
      return this.$store.getters["currencyRates"].filter(
        item => item.favorite === true
      );
    },
    otherCurrencyRates: function() {
      return this.$store.getters["currencyRates"].filter(
        item => item.favorite === false
      );
    }
  }
};
</script>
