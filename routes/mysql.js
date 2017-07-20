var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'gljgljglj',
    password : 'gljgogo',
    database : 'songtang_ucenter'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution,2+2 as name', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);

    /* GET users listing. */
    router.get('/2', function(req, res, next) {

        res.render('mysql', { title: 'Express' ,solution:results[0].solution,result : results});
    });
});

connection.end();



module.exports = router;


