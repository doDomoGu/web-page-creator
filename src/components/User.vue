<template>
  <el-row>
    <el-col :span="22" :push="1">
      <el-table id="user-table" :data="tableData" stripe style="width:100%">

        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="password" label="密码" width="180">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="22" :push="1" class="button-row">
      <el-button class="el-button--primary" @click="getData()" >获取</el-button>
    </el-col>
  </el-row>

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'user',
    store: this.$store,
    //beforeCreate
    /*computed: {
      data() {
        return {tableData : this.$store.state.userData}
      }
    },*/
    created() {
      axios.get('http://api.web-page.com/users')
        .then((res) => {
        this.tableData = res.data
      });
    },
    methods: {
      getData: function () {
        axios.get('http://api.web-page.com/users')
        //请求成功后执行then          如果直接在里面访问 this，无法访问到 Vue 实例，this指向发生了变化。建议使用箭头函数,下面有讲
          .then(function (response) {
            console.log(response.data);
            this.$store.state.userData = response.data;
          })
          //请求失败后执行catch
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    data() {
      /*return {
        tableData: this.getData()
      }*/
      return {
        tableData: this.$store.state.userData//this.userData
      }
    }
  }
</script>
<style>
  .button-row {
    margin-top:20px;
  }
</style>
