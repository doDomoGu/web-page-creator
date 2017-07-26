var app = new Vue({
    el: '#tpl-1',
    data: {
        msg: 'Hello Vue!',
        rawHtml: '<div >Hello Vue!</div>',
        ssss: 'ss   2ss2'
    },
    methods: {
        xxxx: function () {
            this.msg = this.msg.split('').reverse().join('')
        }
    }
})
