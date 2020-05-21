<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button @click="$store.state.count++">$store.state.count++</el-button>
  </div>
</template>

<script>
import data from "../store/data";
export default {
  data(){
    return{
      // count:data.count
    };
  }
};
