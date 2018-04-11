/*var express = require('express');

var app = express();
app.get('/', function (req, res) {


});*/

var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');

var baseUrl = "https://cnodejs.org";


superagent.get(baseUrl)
    .end(function (err, res) {
        //
        if (err) {
            console.log(err);
            return next(err);
        }

        var $ = cheerio.load(res.text);

       // console.log($);
        var items = [];
        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            items.push({
                title: $element.attr('title'),
                href: baseUrl + $element.attr('href')
            });
        });
        console.log('items', items);

        async.mapLimit(items, 5,  function (item,callback) {

            fetch(item, callback);

        }, function (err, res) {
            if (err) {
                console.log('err', err);
            }
            console.log('res', res);

        });


    });

function fetch(item,callback) {
    superagent.get(item.href)
        .end(function (err, res) {
            if (err) {
                console.log("err  url", item.href);
            }
            console.log("url", item.href);
            /*  eq.emit('item_html', [item.href , res.text]);*/
            callback(null,{
                href:item.href,
                text:res.text
            });
        });
}

