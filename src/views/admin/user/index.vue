<template>
    <div class="user-main">
        <el-table id="user-table" v-loading="loading" element-loading-text="拼命加载中" :data="tableData" stripe style="width:100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="username" label="用户名" width="180"></el-table-column>
            <!--<el-table-column prop="name" label="姓名" width="180"></el-table-column>-->
            <el-table-column prop="password" label="密码" width="180"></el-table-column>
            <el-table-column prop="sex" :formatter="sexFormat" label="性别"></el-table-column>
            <el-table-column prop="status" :formatter="statusFormat" label="状态"></el-table-column>
        </el-table>
        <el-button id="get-data-btn" class="el-button--primary" @click="getData()" >获取</el-button>
    </div>
</template>

<script>
import { mapActions,mapMutations } from 'vuex'
import axios from '../../../axios'

export default {
    name: 'user',
    created(){
        this.loading = false;
        this.getData();
    },
    methods:{
        increment:function(){
            //this.$store.dispatch('increment2',{count:11});
            console.log(this.$store.getters.getCount)
        },
        sexFormat:function(r, c, v) {
            return  v==1?'男':(v==2?'女':'N/A');
        },
        statusFormat:function(r, c, v) {
            return  v==1?'正常':'禁用';
        },
        getData: function () {
            var that = this;
            that.loading = true;
            //axios.get('http://api.web-page.com/users')
            axios({
                methos:'get',
                url:'/users'
            })
                .then((res) => {
                    that.tableData = res.data;
                    that.loading = false;
                })
                .catch(function(err){
                    console.log(err);
                    that.tableData = [];
                    that.loading = false;
                })
        }
        /*mapMutations([
            'LIST'=>(this.$store)
                   ])*/

    },
    computed: {
        count111() {
              /*console.log(this.$store);
              console.log(this.$store.state.users);
              console.log(this.$store.state.users.);
              console.log(this.$store.getters.doneTodos);*/

              //console.log(this.$store.getters.doneTodosCount);
              console.log(this.$store.getters.getCount);


              //this.$store.users.commit('increment',(this.$store.state.users));
              return this.$store.state.users.users_list;
        }
    },
    data() {
        /*return {
            tableData: this.getData()
        }*/
      return {
            tableData: this.$store.state.users.list
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
