<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "app",
  components: {
    appNav: Navbar
  }
};
</script>


<style  lang="scss">
@import "./styles/base";
@import "./styles/config";
@import "./styles/helpers";
</style>
