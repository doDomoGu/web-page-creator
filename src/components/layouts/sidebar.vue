<template>
  <div id="sidebar">
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" theme="dark" v-bind:unique-opened=true @select="handleSelect" @open="handleOpen" @close="handleClose" router>
      <el-menu-item index="/"><i class="el-icon-menu"></i>首页</el-menu-item>
      <el-menu-item index="/user"><i class="el-icon-caret-right"></i>用户</el-menu-item>
      <el-menu-item index="/setting"><i class="el-icon-setting"></i>设置</el-menu-item>
      <el-menu-item index="/logout"><i class="el-icon-caret-right"></i>退出</el-menu-item>

     <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>导航一
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-message"></i>导航二
        </template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
      </el-submenu>

      <el-menu-item index="4"><i class="el-icon-setting"></i>导航四</el-menu-item>
      <el-menu-item index="/about"><i class="el-icon-setting"></i>导航四</el-menu-item>-->
    </el-menu>
  </div>

</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log('open',key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log('close',key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log('select',key, keyPath);
      }
    }
  }
</script>

<style>
  #sidebar {
    height:100%;
    width:240px;
    position:absolute;
  }

  #sidebar .el-menu {
    height:100%;
    border-radius: 0;
  }
</style>
