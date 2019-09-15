<template>
  <div id="currency">
    <p class="alert-danger" v-if="errorMessage">{{errorMessage}}</p>

    <h2>Currencies</h2>
    <app-search @searchEvent="filterCurrencies" :searchPlaceholder="searchPlaceholder"></app-search>
    <p>Results: {{currencies.length}}</p>

    <div class="currency" v-for="(currency, index) in currencies" :key="index">
      <small>[{{currency.code}}]</small>

      <router-link
        :to="{name:'currency-details',params:{currencyCode:currency.code,currencyName:currency.name}}"
      >{{currency.name}}</router-link>
      <span>{{currency.symbol}}</span>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
export default {
  name: "currency",
  components: {
    appSearch: Search
  },

  data() {
    return {
      searchPlaceholder: "Search for a currency"
    };
  },
  methods: {
    filterCurrencies(searchData) {
      searchData.data = "currencies";
      this.$store.commit("filterData", searchData);
    }
  },

  computed: {
    currencies() {
      return this.$store.getters.filteredCurrencies.filter(
        cur => cur.code !== null && cur.code !== "(none)"
      );
    },
    errorMessage() {
      return this.$store.getters.errorMessage;
    }
  },

  created() {
    console.log("currency component created");
    if (this.$store.getters.currencies.length === 0) {
      console.log("no currencies, fetching countries, setting currencies");
      this.$store.dispatch("fetchCountries");
    } else {
      this.$store.commit("initFilteredCurrencies");
    }
  }
};
</script>

<style lang="scss">
#currency {
  margin: 1rem;
  padding: 0 2rem;
  h2 {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  .currency {
    display: flex;

    small {
      margin-right: 2rem;
      width: 50px;
    }
    a {
      text-decoration: none;
      font-size: 1.2rem;
      margin-right: 1rem;
      width: 250px;
    }
  }
}
</style>