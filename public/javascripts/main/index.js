import axios from 'axios';
/*


Vue.prototype.$ajax = axios;*/

axios.get('http://api.web-page.com/users')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (response) {
        console.log(response);
    });
/*
new Vue({
    el:'#test',
    data:{data:""},
    beforeCreate:function(){
        var url="http://api.web-page.com/users";
        var _self=this;
        $.get(url,function(data){
            console.log(data);

            //_self.data=eval("(" + data +")");
        })
        /!*
        this.$http.get(url).then(function(data){
            var json=data.body;
            this.data=eval("(" + json +")");
        },function(response){
            console.info(response);
        })*!/
    }
});*/
