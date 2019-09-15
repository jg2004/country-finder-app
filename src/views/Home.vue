<template>
  <div id="home">
    <p class="alert-danger" v-if="errorMessage">{{errorMessage}}</p>
    <app-search
      :sortable="true"
      @searchEvent="filterAndSort"
      :searchPlaceholder="searchPlaceholder"
    ></app-search>
    <label id="results" for="search">Results: {{filteredCountries.length}}</label>
    <app-country
      v-for="(country,index) in filteredCountries"
      :key="country.alpha3Code"
      :country="country"
      :ranking="index"
    ></app-country>
  </div>
</template>
<script>
import ai from "@/utils/axiosInit";
import Country from "@/components/Country";
import Search from "@/components/Search";
export default {
  name: "home",

  components: {
    appSearch: Search,
    appCountry: Country
  },
  data() {
    return {
      searchPlaceholder: "Search for a country"
    };
  },
  computed: {
    filteredCountries() {
      return this.$store.getters.filteredCountries;
    },
    errorMessage() {
      return this.$store.getters.errorMessage;
    }
  },
  methods: {
    filterAndSort(searchData) {
      searchData.data = "countries";
      this.$store.commit("filterData", searchData);
      this.$store.commit("sortData", searchData);
    }
  },
  async created() {
    //make get request from country rest api if state isn't populated
    console.log("Home component created called");
    if (this.$store.getters.countries.length === 0) {
      console.log("countries array empty");
      this.$store.dispatch("fetchCountries");
    } else {
      this.$store.commit("initFilteredCountries");
    }
  }
};
</script>

<style lang="scss">
#home {
  margin: 1rem;
  padding: 0 2rem;
}
</style>