<template>
  <nav>
    <div class="nav-wrapper container">
      <div class="block-logo flex">
        <ul class="right hide-on-small-and-down">
          <li>
            <a
              class="dropdown-trigger brand-logo white-text"
              href="#"
              data-target="dropdown"
              ref="dropdown"
            >
              {{ mainCurrency }}
              <i class="material-icons white-text right">arrow_drop_down</i>
            </a>

            <ul id="dropdown" class="dropdown-content">
              <li
                v-for="cur of favoriteCurrencyRates"
                :key="cur.curId"
                class="black-text"
                @click="updateMainCurrency(cur.curAbbreviation)"
              >
                {{ cur.curAbbreviation }}
              </li>
            </ul>
          </li>
        </ul>

        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li class="nav-item" v-bind:class="{active: isActive}" v-on:click="isActive=!isActive">
            <router-link to="/currencies" class="white-text">
              {{ "Currencies" | localize }}
            </router-link>
          </li>
          <li class="nav-item" v-bind:class="{active: !isActive}" v-on:click="isActive=!isActive">
            <router-link to="/converter" class="white-text">
              {{ "Converter" | localize }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="switch">
        <label class="white-text">
          English
          <input
            type="checkbox"
            v-model="isRuLocale"
            @change.prevent="changeLocale"
          />
          <span class="lever"></span>
          Русский
        </label>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    isRuLocale: true,
    mainCurrency: null,
    isActive: true
  }),
  mounted() {
    M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
      coverTrigger: false
    });
    this.mainCurrency = this.getMainCurrency;
    this.isRuLocale = this.locale === "ru-RU";
    console.log("header",this.$route.path)
    this.isActive = this.$route.path == "/currencies" || this.$route.path == "/"
    this.loading = false;
  },

  computed: {
    favoriteCurrencyRates: function() {
      return this.$store.getters["currencyRates"] == null
        ? this.favoritesCurrencies
        : this.$store.getters["currencyRates"].filter(
            item => item.favorite === true
          );
    },
    getMainCurrency() {
      return this.$store.getters["mainCurrency"];
    },
    currencyRates() {
      return this.$store.getters["currencyRates"];
    },
    favoritesCurrencies() {
      return this.$store.getters["favoritesCurrencies"];
    },
    locale() {
      return this.$store.getters["locale"];
    }
  },

  methods: {
    updateMainCurrency(value) {
      this.mainCurrency = value;
      this.$store.dispatch("updateMainCurrency", value);
    },
    changeLocale() {
      this.isRuLocale
        ? this.$store.dispatch("changeLocale", "ru-RU")
        : this.$store.dispatch("changeLocale", "en-US");
    }
  }
};
</script>

<style scoped>
.brand-logo {
  position: relative;
}
.dropdown-content {
  max-height: 10rem;
}
li.black-text {
  min-height: 1rem;
  padding-left: 1rem;
}
.active {
  border-bottom: 1px solid;
}
</style>
