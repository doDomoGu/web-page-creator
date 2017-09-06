<template>
    <el-row class="user-main">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="用户名">
                <el-input v-model="searchForm.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="searchForm.mobile" placeholder="手机"></el-input>
            </el-form-item>
            <!--<el-form-item label="状态">
                <el-select v-model="searchForm.status" placeholder="状态">
                    <el-option label="&#45;&#45;" value=""></el-option>
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="禁用" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核状态">
                <el-select v-model="searchForm.verify" placeholder="审核状态">
                    <el-option label="&#45;&#45;" value=""></el-option>
                    <el-option label="审核通过" value="1"></el-option>
                    <el-option label="待审核" value="0"></el-option>
                    <el-option label="审核不通过" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称" label-width="55px">
                <el-input v-model="searchForm.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="searchForm.email" placeholder="邮箱"></el-input>
            </el-form-item>-->
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
        </el-form>


        <el-table id="user-table" v-loading="loading" element-loading-text="拼命加载中" :data="tableData" stripe style="width:100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="username" label="用户名" width="180"></el-table-column>
            <el-table-column prop="name" label="名称" width="180"></el-table-column>
            <el-table-column prop="mobile" label="手机" width="180"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="usergroups" label="所属用户组" width="180"></el-table-column>
            <el-table-column prop="status" :formatter="statusFormat" label="状态"></el-table-column>
            <el-table-column prop="verify" :formatter="verifyFormat" label="审核"></el-table-column>
            <el-table-column prop="operation" :formatter="operationFormat" label="操作"></el-table-column>
        </el-table>
        <el-button id="get-data-btn" class="el-button--primary" @click="onRefresh" >刷新</el-button>
    </el-row>
</template>

<script>
import { mapActions,mapMutations } from 'vuex'
import axios from '../../../axios'

export default {
    name: 'user_index',
    data() {
        return {
            searchForm: {},// this.$store.getters['search/users'],
            tableData: []//this.$store.state.users.list
        }
    },
    created(){
        this.loading = true;
        //读取store
        var s = this.$store.getters['search/users'];
        for(var i in s){
            //对searchForm字段初始化
            this.searchForm[i] = s[i];
        }
        this.getData(this.searchForm);
    },
    methods:{
        onSearch:function(){
            this.loading = true;
            //保存搜索条件到store
            var s = {};
            for(var i in this.searchForm){
                s[i] = this.searchForm[i];
            }
            this.$store.dispatch('search/UpdateUsers', s);

            this.getData(s);
        },
        sexFormat:function(r, c, v) {
            return  v==1?'男':(v==2?'女':'N/A');
        },
        statusFormat:function(r, c, v) {
            return  v==1?'正常':'禁用';
        },
        verifyFormat:function(r, c, v) {
            return  v==1?'审核通过':(v==2?'审核不通过':'待审核');
        },
        operationFormat:function(r, c, v) {
            return  '---';
        },
        getData: function (params) {
            var that = this;
            that.loading = true;
            axios({
                methods:'get',
                url:'/users',
                params:params
            })
            .then((res) => {
                var UserRes = res.data;
                if(UserRes.length>0){
                    var userids = [];
                    for(var i in UserRes){
                        userids.push(UserRes[i].id);
                    }
                    axios({
                        methods:'get',
                        url:'/users/usergroups',
                        params:{
                            userids:userids.join(',')
                        }
                    })
                    .then((res) => {
                        for(var i in UserRes){
                            UserRes[i].usergroups = res.data.data[UserRes[i].id].join(',');
                        }
                        that.tableData = UserRes;
                        that.loading = false;
                    })
                    .catch(function(err){
                        console.log(err);
                        that.tableData = [];
                        that.loading = false;
                    })
                }else{
                    that.tableData = UserRes;
                    that.loading = false;
                }
            })
            .catch(function(err){
                console.log(err);
                that.tableData = [];
                that.loading = false;
            })
        },
        onRefresh: function(){
            this.loading = true;
            //读取store里的搜索条件
            this.getData(this.$store.getters['search/users']);
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
