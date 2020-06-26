<template>
  <Loader v-if="loading" />
  <div v-else>
    <ul class="collection">
      <li
        class="collection-item"
        v-for="cur of favoriteCurrencyRates"
        :key="cur.Cur_ID"
      >
        <p class="icon">
          <i class="material-icons" @click="updateFavoriteCurrency(cur.Cur_ID)"
            >star</i
          >
        </p>
        <p class="Abbreviation">{{ cur.Cur_Abbreviation }}</p>
        <p class="Cur_Name">
          {{ cur.Cur_Name_Eng | localize }}
        </p>
        <p class="Cur_Scale">
          {{ adaptRounding(mainRates / cur.Cur_OfficialRate, cur.Cur_Scale) }}
        </p>
        <p class="Cur_OfficialRate">
          {{
            adaptRounding(
              cur.Cur_OfficialRate / mainRates,
              cur.Cur_OfficialRate / mainRates
            ).toFixed(4) +
              " " +
              getMainCurrency
          }}
        </p>
      </li>

      <li
        class="collection-item"
        v-for="cur of otherCurrencyRates"
        :key="cur.Cur_ID"
      >
        <p class="icon">
          <i
            class="material-icons"
            @click.prevent="updateFavoriteCurrency(cur.Cur_ID)"
            >star_border</i
          >
        </p>
        <p class="Abbreviation">{{ cur.Cur_Abbreviation }}</p>
        <p class="Cur_Name">
          {{ cur.Cur_Name_Eng | localize }}
        </p>
        <p class="Cur_Scale">
          {{ adaptRounding(mainRates / cur.Cur_OfficialRate, cur.Cur_Scale) }}
        </p>
        <p class="Cur_OfficialRate">
          {{
            adaptRounding(
              cur.Cur_OfficialRate / mainRates,
              cur.Cur_OfficialRate / mainRates
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
    updateFavoriteCurrency(Cur_ID) {
      this.$store.dispatch("updateFavoriteCurrency", Cur_ID);
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
        i => i.Cur_Abbreviation === this.$store.getters["mainCurrency"]
      ).Cur_OfficialRate;
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
.collection-item > p.Cur_Name {
  width: 40% !important;
  margin: 0;
}
.collection-item > p.Cur_Scale,
.collection-item > p.Cur_OfficialRate {
  width: 20% !important;
  text-align: end;
  margin: 0;
}
.material-icons {
  cursor: pointer;
}
</style>
