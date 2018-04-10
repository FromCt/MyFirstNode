/*var express = require('express');

var app = express();
app.get('/', function (req, res) {


});*/

var superagent = require('superagent');
var cheerio = require('cheerio');

superagent.get('https://cnodejs.org')
    .end(function (err, res) {
        //
        if (err) {
            console.log(err);
            return next(err);
        }

        var $ = cheerio.load(res.text);

        console.log($);
        var items = [];
        $('#topic_list .topic_title').each(function (idx, element) {
            var $element = $(element);
            items.push({
                title: $element.attr('title'),
                href: $element.attr('href')
            });
        });
        console.log('items', items);

        //console.log(res);

    });
