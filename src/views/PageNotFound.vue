<template>
  <div id="not-found">
    <h1>Page Not Found</h1>
    <button @click="$router.go(-1)" class="btn">Go Back</button>
  </div>
</template>

<style lang="scss">
#not-found {
  margin: 1rem;
  padding: 0 2rem;
  text-align: center;

  h1 {
    margin-bottom: 2rem;
  }
}
</style>