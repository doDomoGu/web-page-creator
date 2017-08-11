<template>
    <div class="user-main">
      <el-table id="user-table" v-loading="loading" element-loading-text="拼命加载中" :data="tableData" stripe style="width:100%">
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="password" label="密码" width="180">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
        </el-table-column>
      </el-table>

      <el-button id="get-data-btn" class="el-button--primary" @click="getData()" >获取</el-button>

    </div>


</template>

<script>
  import axios from 'axios'

  import { mapActions } from 'vuex'

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
      this.getData()
    },
    methods: {
      getData: function () {
        this.loading = true;
        axios.get('http://api.web-page.com/users')
           .then((res) => {
            this.tableData = res.data;
            this.loading = false;
        });
      }
    },
    data() {
      /*return {
        tableData: this.getData()
      }*/
      return {
        tableData: []  //this.userData

      }
    }
  }
</script>
<style>
  /*.user-main {
    padding:24px;
  }*/
  #get-data-btn {
    margin-top:20px;
  }
</style>
