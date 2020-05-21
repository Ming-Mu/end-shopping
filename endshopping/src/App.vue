<template>
  <div id="app">
    <!-- 路由视图 -->
    <router-view/>
  </div>
</template>
<script>
import data from "./store/data";
export default {
  data(){
    return{};
  },
  computed:{
    // count(){
    //   return this.$store.state.count;
    // }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}
</style>
