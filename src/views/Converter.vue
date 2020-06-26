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
                    :key="cur.curId"
                    class="black-text"
                    @click="updateConverterMainCurrency(cur.curAbbreviation)"
                  >
                    {{ cur.curAbbreviation }}
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
                    :key="cur.curId"
                    class="black-text"
                    @click="
                      updateConverterNecessaryCurrency(cur.curAbbreviation)
                    "
                  >
                    {{ cur.curAbbreviation }}
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
    enteredValue: 1
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
    currencyRates() {
      return this.$store.getters["currencyRates"];
    },
    converterMainCurrency() {
      return this.$store.getters["converterMainCurrency"];
    },
    converterNecessaryCurrency() {
      return this.$store.getters["converterNecessaryCurrency"];
    },
    favoritesCurrencies() {
      return this.$store.getters["favoritesCurrencies"];
    },
    favoriteCurrencyRates: function() {
      return this.$store.getters["currencyRates"] === null
        ? this.favoritesCurrencies
        : this.$store.getters["currencyRates"].filter(
            item => item.favorite === true
          );
    },
    requiredCurrencyRatio() {
      return this.currencyRates === null
        ? 1
        : this.currencyRates.find(
            i =>
              i.curAbbreviation ===
              this.$store.getters["converterMainCurrency"]
          ).curOfficialRate /
            this.currencyRates.find(
              i =>
                i.curAbbreviation ===
                this.$store.getters["converterNecessaryCurrency"]
            ).curOfficialRate;
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
</style>
