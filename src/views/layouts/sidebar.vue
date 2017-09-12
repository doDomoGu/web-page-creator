<template>
    <div id="sidebar">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" theme="dark" v-bind:unique-opened=true @select="handleSelect" @open="handleOpen" @close="handleClose" router>
            <el-menu-item-group :title="username">
            </el-menu-item-group>
            <el-menu-item index="/"><i class="el-icon-menu"></i>首页</el-menu-item>
            <el-menu-item index="/setting"><i class="el-icon-setting"></i>设置</el-menu-item>

            <el-submenu index="admin">
                <template slot="title">
                    <i class="el-icon-caret-right"></i>后台管理
                </template>
                <el-menu-item index="/admin/user">用户</el-menu-item>
                <el-menu-item index="/admin/usergroup">用户组</el-menu-item>
            </el-submenu>
            <el-menu-item index="/logout"><i class="el-icon-caret-right"></i>退出</el-menu-item>
            <!--<el-menu-item @click="getRoute"><i class="el-icon-caret-right"></i>3132</el-menu-item>-->
        </el-menu>
    </div>
</template>

<script>
  export default {
      data(){
          return {

              username:this.$store.state.auths.user_id?this.$store.state.auths.user_id:'dada'
          }
      },
    methods: {
      handleOpen(key, keyPath) {
        console.log('open',key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log('close',key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log('select',key, keyPath);
      },
        getRoute(){
          console.log(1111);
          console.log(this.$store.state.auths.add_routes);
        }
    },
      created(){
          /*console.log('');
          console.log('sidebar created start');
         console.log(this.$router);
         console.log(this.$router.options.routes);
          console.log('sidebar created stop');*/
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
