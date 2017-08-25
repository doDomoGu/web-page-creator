var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    AXIOS_BASEURL : '"http://api.web-page.com"'
})
