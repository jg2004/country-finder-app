<template>
  <div class="search-input">
    <input
      @input="emitSearchData"
      v-model="search.searchTerm"
      type="text"
      name="search"
      id="search"
      :placeholder="searchPlaceholder"
    />
    <div v-if="sortable">
      <label for="sortBy">Sort By</label>

      <select @change="emitSearchData" name="sortBy" v-model="search.sortBy">
        <option value="population">Population</option>
        <option value="area">Area</option>
        <option value="name">Name</option>
      </select>

      <input @change="emitSearchData" v-model="search.order" type="radio" name="order" value="-1" />ASC
      <input @change="emitSearchData" v-model="search.order" type="radio" name="order" value="1" />
      DES
    </div>
  </div>
</template>
    
  </div>
</template>

<script>
export default {
  name: "search",
  props: {
    sortable: {
      type: Boolean,
      default: false
    },
    searchPlaceholder: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      search: {
        searchTerm: "",
        sortBy: "name",
        order: "-1"
      }
    };
  },
  methods: {
    emitSearchData() {
      this.$emit("searchEvent", this.search);
    }
  }
};
</script>

<style lang="scss">
.search-input {
  margin: 1.5rem 0;
  display: flex;
  label,
  select,
  input[type="text"] {
    font-size: 1rem;
    padding: 0.5rem;
    margin-right: 1rem;
  }

  #results {
    display: block;
  }
}

@media only screen and (max-width: 660px) {
  .search-input {
    flex-direction: column;
    label,
    select,
    input[type="text"] {
      margin-bottom: 1rem;
      width: 100%;
    }
    label {
      display: inline-block;
    }
    input[type="radio"] {
      margin-left: 0.8rem;
    }
  }
}
</style>