<template>
  <Loader v-if="loading" />
  <div v-else>
    <ul class="collection">
      <li
        class="collection-item"
        v-for="cur of favoriteCurrencyRates"
        :key="cur.curId"
      >
        <p class="icon">
          <i class="material-icons" @click="updateFavoriteCurrency(cur.curId)"
            >star</i
          >
        </p>
        <p class="Abbreviation">{{ cur.curAbbreviation }}</p>
        <p class="curName">
          {{ cur.curNameEng | localize }}
        </p>
        <p class="curScale">
          {{ adaptRounding(mainRates / cur.curOfficialRate, cur.curScale) }}
        </p>
        <p class="curOfficialRate">
          {{
            adaptRounding(
              cur.curOfficialRate / mainRates,
              cur.curOfficialRate / mainRates
            ).toFixed(4) +
              " " +
              getMainCurrency
          }}
        </p>
      </li>

      <li
        class="collection-item"
        v-for="cur of otherCurrencyRates"
        :key="cur.curId"
      >
        <p class="icon">
          <i
            class="material-icons"
            @click.prevent="updateFavoriteCurrency(cur.curId)"
            >star_border</i
          >
        </p>
        <p class="Abbreviation">{{ cur.curAbbreviation }}</p>
        <p class="curName">
          {{ cur.curNameEng | localize }}
        </p>
        <p class="curScale">
          {{ adaptRounding(mainRates / cur.curOfficialRate, cur.curScale) }}
        </p>
        <p class="curOfficialRate">
          {{
            adaptRounding(
              cur.curOfficialRate / mainRates,
              cur.curOfficialRate / mainRates
            ).toFixed(4) +
              " " +
              getMainCurrency
          }}
        </p>
      </li>
    </ul>
    <!--    <Paginate-->
    <!--      v-model="page"-->
    <!--      :page-count="pageCount"-->
    <!--      :click-handler="pageChangeHandler"-->
    <!--      :prev-text="'History_Back' | localize"-->
    <!--      :next-text="'History_Forward' | localize"-->
    <!--      :container-class="'pagination'"-->
    <!--      :page-class="'waves-effect'"-->
    <!--    />-->
  </div>
</template>

<script>
// import paginationMixin from "../mixins/pagination.mixin";
import Loader from "../components/spinner/Spinner";

export default {
  name: "Currencies",
  components: { Loader },
  // mixins: [paginationMixin],
  data: () => ({
    loading: true
  }),

  async mounted() {
    this.currenciesAll == null &&
      (await this.$store.dispatch("fetchCurrencies"));
    this.currencyRates == null &&
      (await this.$store.dispatch("fetchCurrencyRates"));
    this.loading = false;
    // this.setup();
  },

  methods: {
    updateFavoriteCurrency(curId) {
      this.$store.dispatch("updateFavoriteCurrency", curId);
    },
    adaptRounding(a, b) {
      return a < 0.1 ? this.adaptRounding(a * 10, b * 10) : b;
    }

    // setup() {
    //   this.setupPagination(
    //     this.currencyRates.map(item => {
    //       return item;
    //     })
    //   );
    // }
  },

  computed: {
    getMainCurrency() {
      return this.$store.getters["mainCurrency"];
    },
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
    },
    mainRates() {
      return this.currencyRates.find(
        i => i.curAbbreviation === this.$store.getters["mainCurrency"]
      ).curOfficialRate;
    }
  }
};
</script>

<style>
.collection-item {
  display: flex !important;
}
.collection-item > p.icon,
.collection-item > p.Abbreviation {
  width: 10% !important;
  margin: 0;
}
.collection-item > p.curName {
  width: 40% !important;
  margin: 0;
}
.collection-item > p.curScale,
.collection-item > p.curOfficialRate {
  width: 20% !important;
  text-align: end;
  margin: 0;
}
.material-icons {
  cursor: pointer;
}
</style>
