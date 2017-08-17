<template>
    <el-dialog id="loginDialog" title="登录" v-bind:visible=true size="full"  v-bind:showClose=false>
        <el-form id="loginForm" ref="form" :model="form" label-width="80px">
            <el-form-item label="账号">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
  export default {
    name: 'LoginForm',
    data() {
      return {
        form: {
          username: '',
          password: ''
        }
      }

    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style lang='less' >
  #loginDialog {
    .el-dialog {
      padding-top: 160px;
    }
  }


  #loginDialog {
    .el-dialog__header,
    .el-dialog__body {
      width:400px;
      margin:0 auto;
    }
  }

  #loginDialog {
    .el-dialog__header {
      text-align: center;
    }
  }
</style>
