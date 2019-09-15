<template>
  <div id="language">
    <p class="alert-danger" v-if="errorMessage">{{errorMessage}}</p>

    <h2>Languages</h2>
    <app-search @searchEvent="filterLanguages" :searchPlaceholder="searchPlaceholder"></app-search>
    <p>Results: {{languages.length}}</p>

    <div class="language" v-for="(lang, index) in languages" :key="index">
      <router-link
        :to="{name:'language-details',params:{languageCode:lang.iso639_2,languageName:lang.name}}"
      >{{lang.name}}</router-link>
      <span>{{lang.nativeName}}</span>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search";
export default {
  name: "language",
  components: {
    appSearch: Search
  },

  data() {
    return {
      searchPlaceholder: "Search for a language"
    };
  },
  methods: {
    filterLanguages(searchData) {
      searchData.data = "languages";
      this.$store.commit("filterData", searchData);
    }
  },

  computed: {
    languages() {
      return this.$store.getters.filteredLanguages;
    },
    errorMessage() {
      return this.$store.getters.errorMessage;
    }
  },

  created() {
    console.log("language component created");
    if (this.$store.getters.languages.length === 0) {
      console.log("no languages, fetching countries, setting languages");
      this.$store.dispatch("fetchCountries");
    } else {
      this.$store.commit("initFilteredLanguages");
    }
  }
};
</script>

<style lang="scss">
#language {
  margin: 1rem;
  padding: 0 2rem;
  h2 {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  .language {
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