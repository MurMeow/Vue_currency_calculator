import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

const BYN = {
  Cur_ID: 0,
  Cur_Abbreviation: "BYN",
  Cur_Scale: 1,
  Cur_Name: "Белорусский рубль",
  Cur_Name_Eng: "Belarusian Ruble",
  Cur_OfficialRate: 1,
  favorite: true
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    isLoading: false,
    locale: "en-US",
    mainCurrency: "BYN",
    currenciesAll: null,
    currencyRates: null,
    favoritesCurrencies: [
      { Cur_Abbreviation: "USD", Cur_ID: 145 },
      { Cur_Abbreviation: "EUR", Cur_ID: 292 },
      { Cur_Abbreviation: "RUB", Cur_ID: 298 },
      { Cur_Abbreviation: "BYN", Cur_ID: 0 }
    ],
    converterMainCurrency: "BYN",
    converterNecessaryCurrency: "USD"
  },

  mutations: {
    setCurrenciesAll(state, currencies) {
      state.currenciesAll = currencies;
    },
    setIsLoading(state) {
      state.setIsLoading = !state.setIsLoading;
    },
    async setCurrencyRates(state, currency) {
      // console.log("stor setCurrencyRates=> currency", currency);
      const myCurrency = await currency.map(item => {
        item.Cur_Name_Eng = state.currenciesAll.find(
          i => i.Cur_ID === item.Cur_ID
        ).Cur_Name_Eng;
        if (
          item.Cur_Abbreviation === "BYN" ||
          item.Cur_Abbreviation === "RUB" ||
          item.Cur_Abbreviation === "USD" ||
          item.Cur_Abbreviation === "EUR"
        ) {
          item.favorite = true;
          return item;
        } else {
          item.favorite = false;
          return item;
        }
      });
      myCurrency.push(BYN);
      state.currencyRates = myCurrency;
    },
    setMainCurrency(state, currency) {
      state.mainCurrency = currency;
    },
    setFavoriteStatus(state, Cur_ID) {
      const updatedCurrencyRates = state.currencyRates.map(item => {
        if (item.Cur_ID === Cur_ID) {
          return { ...item, favorite: !item.favorite };
        }
        return item;
      });
      state.currencyRates = updatedCurrencyRates;
    },
    setConverterMainCurrency(state, currency) {
      state.converterMainCurrency = currency;
    },
    setConverterNecessaryCurrency(state, currency) {
      state.converterNecessaryCurrency = currency;
    },
    setLocale(state, locale) {
      state.locale = locale;
    },
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    async fetchCurrencies({ dispatch, commit, getters }) {
      try {
        await Axios.get(
          `https://www.nbrb.by/api/exrates/currencies`
        ).then(res => commit("setCurrenciesAll", res.data));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCurrencyRates({ dispatch, commit, getters }) {
      try {
        await Axios.get(
          `https://www.nbrb.by/api/exrates/rates?periodicity=0`
        ).then(res => commit("setCurrencyRates", res.data));
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    updateConverterMainCurrency({ dispatch, commit, getters }, newValue) {
      commit("setConverterMainCurrency", newValue);
    },
    updateMainCurrency({ dispatch, commit, getters }, newValue) {
      commit("setMainCurrency", newValue);
      commit("setConverterMainCurrency", newValue);
    },
    updateIsLoading({ dispatch, commit, getters }) {
      commit("setIsLoading");
    },
    updateConverterNecessaryCurrency({ dispatch, commit, getters }, newValue) {
      commit("setConverterNecessaryCurrency", newValue);
    },
    updateFavoriteCurrency({ dispatch, commit, getters }, Cur_ID) {
      commit("setFavoriteStatus", Cur_ID);
    },
    changeLocale({ dispatch, commit, getters }, locale) {
      commit("setLocale", locale);
    }
  },
  getters: {
    error: s => s.error,
    isLoading: s => s.isLoading,
    locale: s => s.locale,
    mainCurrency: s => s.mainCurrency,
    currenciesAll: s => s.currenciesAll,
    favoritesCurrencies: s => s.favoritesCurrencies,
    currencyRates: s => s.currencyRates,
    converterMainCurrency: s => s.converterMainCurrency,
    converterNecessaryCurrency: s => s.converterNecessaryCurrency
  },
  modules: {}
});
