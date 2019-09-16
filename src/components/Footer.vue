<template>
  <footer>
    <div>&copy; 2019, JG</div>

    <div>Powered by REST Countries API</div>
  </footer>
</template>

<style lang="scss">
@import "../styles/config";

footer {
  background: $primary;
  margin-top: 2rem;
  color: $background;
  padding: 2rem 1rem;
  display: flex;
  justify-content: space-between;

  :last-child {
    text-align: right;
  }
}
</style>