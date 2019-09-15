<template>
  <div v-if="country" id="details">
    <h1>
      {{country.name}}
      <small>[{{country.alpha3Code}}]</small>
    </h1>

    <hr class="mb-2 mt-1" />

    <img :src="country.flag" alt="country-flag" />

    <p>
      <span>Capital:</span>
      {{country.capital || 'N/A'}}
    </p>
    <p>
      <span>Demonym:</span>
      {{country.demonym}}
    </p>
    <p>
      <span>Languages:</span>
      <span v-for="(language, index) in country.languages" :key="index">
        {{language.name}}
        <span v-if=" index < country.languages.length-1">,</span>
      </span>
    </p>
    <p>
      <span>Currency:</span>
      <span v-for="(currency, index) in country.currencies" :key="index">
        {{currency.name}}
        <span v-if=" index < country.currencies.length-1">,</span>
      </span>
    </p>
    <p>
      <span>Calling Codes:</span>
      <span v-for="(callingCode, index) in country.callingCodes" :key="index">
        {{callingCode||'N/A'}}
        <span v-if=" index < country.callingCodes.length-1">,</span>
      </span>
    </p>
    <p>
      <span>Area:</span>
      {{country.area|toSquareMiles}} mi
      <sup>2</sup>
    </p>
    <p>
      <span>Population:</span>
      {{country.population.toLocaleString()}}
    </p>
    <p v-if="country.region">
      <span>Region:</span>
      {{country.region}}
    </p>
    <p v-if="country.subregion">
      <span>SubRegion:</span>
      {{country.subregion}}
    </p>
    <p class="flex-wrap">
      <span>Borders:&nbsp;</span>
      <span v-for="(code, index) in country.borders" :key="index">
        <router-link :to="{name:'country-details', params:{countryId:code}}">&nbsp;{{code}}</router-link>

        <span v-if=" index < country.borders.length-1">,</span>
      </span>
    </p>
    <p>
      <span>Wiki:&nbsp;</span>
      <a :href="url(country.name)" target="blank">{{country.name}}</a>
    </p>
  </div>
</template>

<script>
import ai from "../utils/axiosInit";
export default {
  name: "country-details",

  props: {
    countryId: {
      type: String
    }
  },

  data() {
    return {
      country: null
    };
  },

  methods: {
    url(val) {
      return `https://en.wikipedia.org/wiki/${val}`;
    },
    async getCountry(countryId) {
      try {
        const resp = await ai.get(`alpha/${countryId}`);
        console.log(resp.data);
        this.country = resp.data;
      } catch (error) {
        const message = `The following error occured while retrieving data: ${error.message}`;
        this.errorMessage = message;
      }
    }
  },

  async beforeRouteUpdate(to, from, next) {
    this.getCountry(to.params.countryId);
    next();
  },

  async created() {
    this.getCountry(this.countryId);
  }
};
</script>
<style lang="scss">
@import "../styles/config";
#details {
  width: 400px;
  padding: 1rem;
  margin: 0 auto;
  background: white;
  margin-top: 3rem;
  border: 1px solid lightgray;
  box-shadow: 5px 10px 8px #888888;
  a {
    text-decoration: none;
  }

  .flex-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  h1 {
    text-align: center;
    small {
      font-size: 1rem;
    }
  }
  p {
    font-size: 1.2rem;
    :first-child {
      font-weight: 690;
    }
  }

  img {
    max-width: 125px;
    height: auto;
    margin: 0 auto 1rem auto;
    display: block;
  }
}
@media only screen and (max-width: 400px) {
  #details {
    width: 90%;
    margin: 1rem auto;
  }
}
</style>