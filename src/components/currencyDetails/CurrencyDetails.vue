<template>
  <div class='collection-item block'>
    <p class="icon">
      <i class="material-icons" @click="updateFavoriteCurrency(currency.curId)"
      >{{ currency.favorite? "star" : "star_border" }}
      </i
      >
    </p>
    <p class="Abbreviation">{{ currency.curAbbreviation }}</p>
    <p class="curName">
      {{ currency.curNameEng | localize }}
    </p>
    <p class="curScale">
      {{ adaptRounding(mainRates / currency.curOfficialRate, currency.curScale) }}
    </p>
    <p class="curOfficialRate">
      {{ adaptRounding(
      currency.curOfficialRate / mainRates,
      currency.curOfficialRate / mainRates
      ).toFixed(4) +
      " " +
      getMainCurrency
      }}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'CurrencyDetails',
    props: ['currency'],
    methods: {
      updateFavoriteCurrency(curId) {
        this.$store.dispatch("updateFavoriteCurrency", curId);
      },
      adaptRounding(a, b) {
        return a < 0.1 ? this.adaptRounding(a * 10, b * 10) : b;
      }
    },
    computed: {
      getMainCurrency() {
        return this.$store.getters["mainCurrency"];
      },
      mainRates() {
        return this.$store.getters["currencyRates"].find(
          i => i.curAbbreviation === this.$store.getters["mainCurrency"]
        ).curOfficialRate;
      }
    }
  }
</script>


<style scoped>
  .block {
    width: 100%;
  }
  .collection-item {
    display: flex;
  }
  .collection-item > p.icon,
  .collection-item > p.Abbreviation {
    width: 10%;
    margin: 0;
  }
  .collection-item > p.curName {
    width: 40%;
    margin: 0;
  }
  .collection-item > p.curScale,
  .collection-item > p.curOfficialRate {
    width: 20%;
    text-align: end;
    margin: 0;
  }
  .material-icons {
    cursor: pointer;
  }
</style>


