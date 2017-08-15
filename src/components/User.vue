<template>
    <div class="user-main">
        <el-table id="user-table" v-loading="loading" element-loading-text="拼命加载中" :data="tableData" stripe style="width:100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="password" label="密码" width="180"></el-table-column>
            <el-table-column prop="sex" label="性别"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
        </el-table>
        <el-button id="get-data-btn" class="el-button--primary" @click="increment()" >获取</el-button>
    </div>
</template>

<script>
    import { mapActions,mapMutations } from 'vuex'
    //import axios from 'axios'



  export default {
    name: 'user',
    created(){
        this.loading = false;

      //console.log(this.$store);
      //console.log(this.$route);
      /*this.$store.dispatch('addUser',{
          name:'22',password:'22233',sex:2,status:1
      })*///——（“action名”，data）;
    },
      methods:{
          increment:function(){
              //this.$store.dispatch('increment2',{count:11});
              console.log(this.$store.getters.getCount)
          },
          dataFormat:function(data){
              for(var i in data){
                  for(var j in data[i]){
                      if(j=='status'){
                          data[i][j] = data[i][j]==1?'正常':'禁用';
                      }else if(j=='sex'){
                          data[i][j] = data[i][j]==1?'男':(data[i][j]==2?'女':'N/A');
                      }
                  }

              }

              return data;
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


    //beforeCreate
    /*computed: {
      data() {
        return {tableData : this.$store.state.userData}
      }
    },*/
    /*created() {
      this.getData()
    },
    methods: {
      getData: function () {
        this.loading = true;
        var that = this;
        //axios.get('http://api.web-page.com/users')
        axios({
          methos:'get',
          url:'http://api.web-page2.com/users'
        })
          .then((res) => {
            this.tableData = res.data;
            this.loading = false;
          })
          .catch(function(err){
            console.log(err);
            that.tableData = [];
            that.loading = false;
          })
      }
    },*/
    data() {
      /*return {
        tableData: this.getData()
      }*/
      return {
        tableData: this.dataFormat(this.$store.state.users.usersData)  //this.userData

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
