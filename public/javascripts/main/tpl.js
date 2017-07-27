var app = new Vue({
    el: '#tpl-1',
    data: {
        msg: 'Hello Vue!',
        rawHtml: '<div >Hello Vue!</div>',
        ssss: false,
        seen: false
    },
    methods: {
        xxxx: function () {
            this.msg = this.msg.split('').reverse().join('');
            this.ssss = !this.ssss;
            this.seen = !this.seen;
        }
    }
})
