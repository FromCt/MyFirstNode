/**
 * User: ct/512799311@qq.com
 * Date: 2018-04-09
 * Time: 下午 1:06
 *
 */

var express = require('express');
var utility = require('utility');

//创建实例
var app=express();

app.get('/', function (req, res) {
    //取 request 中 的q
    var q = req.query.q;

    //掉用 utility 中 的 md5方法
    // utility 的 github 地址：https://github.com/node-modules/utility
    // 里面定义了很多常用且比较杂的辅助方法，可以去看看
    var md5Value = utility.md5(q);
    res.send(md5Value);
});

app.listen(3000, function (req, res) {
    console.log('app is running at port 3000');
});