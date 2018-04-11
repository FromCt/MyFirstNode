/*var express = require('express');

var app = express();
app.get('/', function (req, res) {


});*/

var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');

var baseUrl = "https://cnodejs.org";
var eq = eventproxy();

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
        
        eq.after("item_html",items.length,function (itemts) {

            console.log('after',itemts);

            itemts = itemts.map(function (data) {
                var $ =cheerio.load(data[1]);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: data[0],
                    comment1: $('.reply_content').eq(0).text().trim(),
                });
            });
            console.log('final:');
            console.log(itemts);
            
        });

        console.log("length==", items.length);

        var count=20;
        items.forEach(function (item) {
            count+=200;
            //用定时器 是应为访问的网站有并发处理机制。并发太快会返回空 回来。
            setTimeout(function () {
              //  console.log('item=' + item.title);
                superagent.get(item.href)
                    .end(function (err, res) {
                        if (err) {
                            //  console.log(err);
                            //  return;
                            console.log("err  url", item.href);
                        }

                        console.log("url", item.href);

                        eq.emit('item_html', [item.href , res.text]);

                    });
            },count);

        });


        //console.log(res);

    });
