<template>
  <nav>
    <div>
      <router-link to="/">Home</router-link>
    </div>

    <div>
      <router-link to="/currency">Currencies</router-link>
      <router-link to="/language">Languages</router-link>
    </div>
  </nav>
</template>



<style lang="scss">
@import "../styles/base";

nav {
  display: flex;
  background: $primary;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  a {
    display: inline-block;
    text-decoration: none;
    font-size: 1.1rem;
    color: black;
    padding: 1.5rem;
    transition: background-color, 500ms;
    &:hover {
      background: darken($color: $primary, $amount: 10);
    }
  }
}

@media only screen and (max-width: 400px) {
  nav {
    flex-direction: column;
    padding: 0;

    div {
      width: 100%;
      text-align: center;
    }
    a {
      display: block;
      width: 100%;
      font-size: 1.3rem;
    }
  }
}
</style>