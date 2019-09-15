import Vuex from "vuex";
import Vue from "vue";
import ai from "../utils/axiosInit";
import * as helper from "../utils/helpers";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    countries: [],
    filteredCountries: [],
    currencies: [],
    filteredCurrencies: [],
    languages: [],
    filteredLanguages: [],
    errorMessage: ""
  },

  getters: {
    countries: state => state.countries,
    filteredCountries: state => state.filteredCountries,
    currencies: state => state.currencies,
    filteredCurrencies: state => state.filteredCurrencies,
    languages: state => state.languages,
    filteredLanguages: state => state.filteredLanguages,
    errorMessage: state => state.errorMessage
  },

  actions: {
    fetchCountries: async context => {
      try {
        console.log("fetching countries...");
        context.commit("clearErrorMessage");
        const resp = await ai.get("all");
        context.commit("setCountries", resp.data);
        context.commit("setCurrencies");
        context.commit("setLanguages");
      } catch (error) {
        const message = `The following error occured while retrieving data: ${error.message}`;
        context.commit("setErrorMessage", message);
        console.log(error.message);
      }
    }
  },

  mutations: {
    clearErrorMessage: state => {
      state.errorMessage = "";
    },
    setErrorMessage: (state, message) => {
      state.errorMessage = message;
    },
    setCountries: (state, countries) => {
      state.countries = countries;
      state.filteredCountries = countries;
    },
    setCurrencies: state => {
      let currencies = [];
      let currencyNames = [];
      //loop over all country currencies and add
      //only ones that have not been added to currencies array
      state.countries.forEach(country => {
        country.currencies.forEach(cur => {
          currencyNames = currencies.map(cur => cur.name);
          if (!currencyNames.includes(cur.name)) {
            currencies.push(cur);
          }
        });
      });
      state.currencies = currencies;
      state.filteredCurrencies = currencies;
    },
    setLanguages: state => {
      let languages = [];
      let languageNames = [];
      //loop over all country languages and add
      //only ones that have not been added to languages array
      state.countries.forEach(country => {
        country.languages.forEach(lang => {
          languageNames = languages.map(lang => lang.name);
          if (!languageNames.includes(lang.name)) {
            languages.push(lang);
          }
        });
      });
      state.languages = languages;
      state.filteredLanguages = languages;
    },

    initFilteredCountries: state => {
      state.filteredCountries = state.countries;
    },
    initFilteredCurrencies: state => {
      state.filteredCurrencies = state.currencies;
    },
    initFilteredLanguages: state => {
      state.filteredLanguages = state.languages;
    },

    filterData: (state, searchData) => {
      //should convert countries to filteredCountries, currencies to filteredCurrencies etc
      const filteredDataString = helper.prependWithFilter(searchData.data);
      state[filteredDataString] = state[searchData.data].filter(el => {
        if (
          el.name &&
          el.name
            .toLowerCase()
            .includes(searchData.searchTerm.trim().toLowerCase())
        ) {
          return true;
        }
      });
    },
    sortData: (state, searchData) => {
      //should convert countries to filteredCountries, currencies to filteredCurrencies etc
      const filteredDataString = helper.prependWithFilter(searchData.data);

      const order = searchData.order * 1;
      state[filteredDataString].sort((a, b) =>
        a[searchData.sortBy] > b[searchData.sortBy] ? -1 * order : order
      );
    }
  }
});

export default store;
