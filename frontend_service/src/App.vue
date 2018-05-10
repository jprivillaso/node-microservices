<template>
  <div class="page">
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>

  body {
    width: 100vw;
    height: 100vh;
  }

  .page {
    margin: 50px;
  }

</style>
