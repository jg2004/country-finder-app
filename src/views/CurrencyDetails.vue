<template>
  <div id="currency-details">
    <p class="alert-danger" v-if="errorMessage">{{errorMessage}}</p>

    <h1>Countries that use the {{currencyName}}</h1>
    <p>Results: {{countries.length}}</p>
    <app-country v-for="(country) in countries" :key="country.alpha3Code" :country="country"></app-country>
  </div>
</template>

<script>
import ai from "@/utils/axiosInit";
import Country from "@/components/Country";

export default {
  name: "currencyDetails",
  components: {
    appCountry: Country
  },

  props: {
    currencyCode: {
      type: String,
      required: true
    },
    currencyName: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      countries: [],
      errorMessage: ""
    };
  },
  async created() {
    try {
      const resp = await ai.get(`currency/${this.currencyCode}`);
      this.countries = resp.data;
    } catch (error) {
      const message = `The following error occured while retrieving data: ${error.message}`;
      this.errorMessage = message;
    }
  }
};
</script>

<style lang="scss">
#currency-details {
  margin: 1rem;
  padding: 0 2rem;
  h1 {
    margin-bottom: 1rem;
  }
}

@media only screen and (max-width: 660px) {
  #currency-details {
    h1 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
  }
}
</style>