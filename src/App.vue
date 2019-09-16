<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view class="main-content"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default {
  name: "app",
  components: {
    appNav: Navbar,
    appFooter: Footer
  },
  created() {
    console.log("App created");
  }
};
</script>


<style  lang="scss">
@import "./styles/base";
@import "./styles/config";
@import "./styles/helpers";

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .main-content {
    flex: 1;
  }
}
</style>
