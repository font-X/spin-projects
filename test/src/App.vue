<template>
  <div id="app">
    <!-- <home /> -->
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
import Home from '@/views/Home'
export default {
  name: "App",
  components:{Home}
 }
</script>

<style>
#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #484a4d;
  height: 100%;
}
</style>
