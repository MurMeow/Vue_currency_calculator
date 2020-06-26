import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

const BYN = {
  curId: 0,
  curAbbreviation: "BYN",
  curScale: 1,
  curName: "Белорусский рубль",
  curNameEng: "Belarusian Ruble",
  curOfficialRate: 1,
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
      { curAbbreviation: "USD", curId: 145 },
      { curAbbreviation: "EUR", curId: 292 },
      { curAbbreviation: "RUB", curId: 298 },
      { curAbbreviation: "BYN", curId: 0 }
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
    setCurrencyRates(state, currency) {
      const currencyRates = currency.map(item => {
        const currencyElement = {
          curId: item.Cur_ID,
          date: item.Date,
          curAbbreviation: item.Cur_Abbreviation,
          curScale: item.Cur_Scale,
          curName: item.Cur_Name,
          curOfficialRate: item.Cur_OfficialRate
        }
        currencyElement.curNameEng = state.currenciesAll.find(
          i => i.Cur_ID === item.Cur_ID
        ).Cur_Name_Eng;

        currencyElement.favorite =  item.Cur_Abbreviation === "BYN" ||
          item.Cur_Abbreviation === "RUB" ||
          item.Cur_Abbreviation === "USD" ||
          item.Cur_Abbreviation === "EUR";

        return currencyElement;
      });
      currencyRates.push(BYN);
      state.currencyRates = currencyRates;
    },
    setMainCurrency(state, currency) {
      state.mainCurrency = currency;
    },
    setFavoriteStatus(state, curId) {
      const updatedCurrencyRates = state.currencyRates.map(item => {
        if (item.curId === curId) {
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
    async fetchCurrencies({ commit }) {
      try {
        const res = await Axios.get('https://www.nbrb.by/api/exrates/currencies')
        commit("setCurrenciesAll", res.data);
      } catch (e) {
        commit("setError", e);
        throw e;
      }
    },
    async fetchCurrencyRates({ commit }) {
      try {
        const res = await Axios.get('https://www.nbrb.by/api/exrates/rates?periodicity=0')
        commit("setCurrencyRates", res.data);
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
    updateIsLoading({ commit }) {
      commit("setIsLoading");
    },
    updateConverterNecessaryCurrency({ dispatch, commit, getters }, newValue) {
      commit("setConverterNecessaryCurrency", newValue);
    },
    updateFavoriteCurrency({ dispatch, commit, getters }, curId) {
      commit("setFavoriteStatus", curId);
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
