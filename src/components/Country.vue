<template>
  <div class="country">
    <img :src="country.flag" alt="country-flag" />
    <div class="description">
      <h2>{{country.name}} [{{country.alpha2Code}}]</h2>
      <h3>Capital: {{country.capital||'N/A'}}</h3>
      <h3>Region: {{country.subregion}}</h3>
      <h3>Population: {{country.population.toLocaleString()}}</h3>

      <h3 v-if="country.area" class="mb-1">
        Area: {{country.area | toSquareMiles}} mi
        <sup>2</sup>
      </h3>

      <h3 v-else>Area: N/A</h3>
      <button @click="seeDetails(country.alpha2Code)" class="btn">More...</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "country",
  methods: {
    seeDetails(code) {
      this.$router.push({
        name: "country-details",
        params: { countryId: code }
      });
    }
  },
  props: {
    country: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="scss">
.country {
  display: flex;
  margin: 1.5rem 0;
  img {
    width: 300px;
  }
  .description {
    margin: 0 1.2rem;
  }
}

@media only screen and (max-width: 600px) {
  .country {
    flex-direction: column;
    img {
      width: 100%;
      margin: 0 auto;
    }
    .description {
      margin: 1rem 0;
    }
  }
}

@media only screen and (max-width: 420px) {
  .description {
    button {
      margin: 0 auto;
      display: block;
    }
  }
}
</style>