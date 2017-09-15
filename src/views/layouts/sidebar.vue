<template>
    <div id="sidebar">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" theme="dark" v-bind:unique-opened=true @select="handleSelect" @open="handleOpen" @close="handleClose" router>
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
        </el-menu>
        <!--<div>
            <input v-model="username"/>  {{username}}
             {{username22}}

        </div>-->
    </div>
</template>
<script>
export default {
    data(){
        //var is_login = this.$store.getters['auths/is_login'];

        return {
            /*is_login:is_login,
            username:this.$store.getters['auths/user_id'],
            username22:this.$store.state.auths.user_id*/
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            //console.log('open',key, keyPath);
        },
        handleClose(key, keyPath) {
            //console.log('close',key, keyPath);
        },
        handleSelect(key, keyPath) {
            //console.log('select',key, keyPath);
        }/*,
        test() {
            console.log('s    ');
            console.log('is_login : ',this.$store.getters['auths/is_login']);

            if(this.$store.getters['auths/is_login']){
                this.$store.dispatch('auths/SetIsLogin',false);
            }else{
                this.$store.dispatch('auths/SetIsLogin',true);
            }

            console.log('is_login : ',this.$store.getters['auths/is_login']);
            console.log(this.is_login);

        }*/

    },
    created(){
        console.log('sidebar created');
    }
}
</script>
<style>
    #sidebar {
        height:100%;
        width:240px;
        position:absolute;
        background-color:#324157;
    }
    #sidebar .el-menu {
        border-radius: 0;
    }
</style>
