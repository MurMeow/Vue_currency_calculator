<template>
  <div class="converter">
    <table class="currency-table">
      <tbody>
        <tr class="type-currencies">
          <td>
            <div class="value_input">
              <input type="text" v-model="enteredValue" ref="value_input" />
            </div>
          </td>

          <td>
            <ul class="right hide-on-small-and-down btn converter-dropdown">
              <li>
                <a
                  class="dropdown-trigger brand-logo white-text"
                  href="#"
                  data-target="dropdown1"
                  ref="dropdown1"
                >
                  {{ converterMainCurrency }}
                  <i class="material-icons white-text right">arrow_drop_down</i>
                </a>

                <ul id="dropdown1" class="dropdown-content" tabindex="0">
                  <li
                    v-for="cur of favoriteCurrencyRates"
                    :key="cur.Cur_ID"
                    class="black-text"
                    @click="updateConverterMainCurrency(cur.Cur_Abbreviation)"
                  >
                    {{ cur.Cur_Abbreviation }}
                  </li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>

        <tr class="value-currencies">
          <td>
            <div class="value_result">
              {{ (requiredCurrencyRatio * enteredValue).toFixed(4) }}
            </div>
          </td>
          <td>
            <ul class="right hide-on-small-and-down btn converter-dropdown">
              <li>
                <a
                  class="dropdown-trigger brand-logo white-text"
                  href="#"
                  data-target="dropdown2"
                  ref="dropdown2"
                >
                  {{ converterNecessaryCurrency }}
                  <i class="material-icons white-text right">arrow_drop_down</i>
                </a>

                <ul id="dropdown2" class="dropdown-content">
                  <li
                    v-for="cur of favoriteCurrencyRates"
                    :key="cur.Cur_ID"
                    class="black-text"
                    @click="
                      updateConverterNecessaryCurrency(cur.Cur_Abbreviation)
                    "
                  >
                    {{ cur.Cur_Abbreviation }}
                  </li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>

export default {
  name: "Converter",
  data: () => ({
    loading: true,
    isRuLocale: false,
    mainCurrencyRate: 1,
    NecessaryCurrencyRate: 1,
    enteredValue: 1,
    valueNecessaryCurrency: 1
  }),

  async mounted() {
    this.currenciesAll == null &&
    (await this.$store.dispatch("fetchCurrencies"));
    this.currencyRates == null &&
    (await this.$store.dispatch("fetchCurrencyRates"));

    M.Dropdown.init(this.$refs.dropdown1, {
      constrainWidth: false,
      coverTrigger: false
    });
    M.Dropdown.init(this.$refs.dropdown2, {
      constrainWidth: false,
      coverTrigger: false
    });

    this.isRuLocale = this.locale === "ru-RU";

    this.mainCurrencyRate = this.currencyRates.find(
      i => i.Cur_Abbreviation === this.$store.getters["converterMainCurrency"]
    ).Cur_OfficialRate;
    this.loading = false;
  },
  methods: {
    updateConverterMainCurrency(value) {
      this.$store.dispatch("updateConverterMainCurrency", value);
    },
    updateConverterNecessaryCurrency(value) {
      this.$store.dispatch("updateConverterNecessaryCurrency", value);
    }
  },

  computed: {
    updateIsLoading() {
      return this.$store.getters["updateIsLoading"];
    },
    currencyRates() {
      return this.$store.getters["currencyRates"];
    },
    converterMainCurrency() {
      return this.$store.getters["converterMainCurrency"];
    },
    converterNecessaryCurrency() {
      return this.$store.getters["converterNecessaryCurrency"];
    },
    favoriteCurrencyRates: function() {
      const a = this.$store.getters["currencyRates"].filter(
        item => item.favorite === true
      );
      return a;
    },
    requiredCurrencyRatio() {
      return (
        this.currencyRates.find(
          i =>
            i.Cur_Abbreviation === this.$store.getters["converterMainCurrency"]
        ).Cur_OfficialRate /
        this.currencyRates.find(
          i =>
            i.Cur_Abbreviation ===
            this.$store.getters["converterNecessaryCurrency"]
        ).Cur_OfficialRate /
        this.currencyRates.find(
          i =>
            i.Cur_Abbreviation === this.$store.getters["converterMainCurrency"]
        ).Cur_Scale
      );
    }
  }
};
</script>

<style>
.currency-table {
  width: fit-content;
}
.type-currencies {
  width: fit-content;
  border: none;
}
td {
  padding: 0;
}
.value-currencies {
  width: fit-content;
}
.converter-dropdown {
  padding: 0 16px !important;
}
.open-dropdown {
  display: block;
  opacity: 1;
  margin: 2.5rem 0 0 -1rem;
  width: 94px;
}
</style>
