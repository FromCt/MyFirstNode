/**
 * User: ct/512799311@qq.com
 * Date: 2018-04-09
 * Time: 下午 12:45
 *
 */

var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send('hello world');
});

app.listen(3000, function () {
    console.log("app is listening at port 3000")
});