<template>
  <el-container id="admin-main">
  <!-- 左侧的菜单 -->
  <el-aside width="200px" style="background-color: #545c64;">
        <div style="text-align:center;padding:30px 0;background:rgba(255,255,255,0.1)">
            <img src="./../assets/logo.png" style="height:50px;">
        </div>
    <el-menu 
        :default-openeds="['1', '3']" 
        background-color="#545c64" 
        text-color="#fff" 
        active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item  index="1-1">
          <router-link to="/home">商品列表</router-link>
        </el-menu-item>
        <el-menu-item index="1-2">
          <router-link to="about">About</router-link>
        </el-menu-item>
        <el-menu-item index="1-3">
          <router-link to="about">商品调试</router-link>
        </el-menu-item>
        <el-menu-item index="1-4">
          <router-link to="about">商品趋势</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>导航二</span>
        </template>
        <el-menu-item  index="2-1">
          <router-link to="/home">商品列表</router-link>
        </el-menu-item>
        <el-menu-item index="2-2">
          <router-link to="about">About</router-link>
        </el-menu-item>
        <el-menu-item index="2-3">
          <router-link to="about">商品调试</router-link>
        </el-menu-item>
        <el-menu-item index="2-4">
          <router-link to="about">商品趋势</router-link>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-setting"></i>
          导航三
        </template>
        <el-menu-item  index="3-1">
          <router-link to="/home">商品列表</router-link>
        </el-menu-item>
        <el-menu-item index="3-2">
          <router-link to="about">About</router-link>
        </el-menu-item>
        <el-menu-item index="3-3">
          <router-link to="about">商品调试</router-link>
        </el-menu-item>
        <el-menu-item index="3-4">
          <router-link to="about">商品趋势</router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  <!-- 右侧菜单 -->
  <el-container direction="vertical">
      <!-- 顶部 -->
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    <!-- 内容部分 -->
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
  </el-container>
</template>
<script>
import home from "./Home.vue"
export default {
    data() {
      return{}
    }
};
</script>
<style scoped>
    .el-submenu__title{
      padding:0px 180px;

    }
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
  
    .el-aside {
        color: #333;
    }
</style>