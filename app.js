const express = require('express');
const path = require("path");
const app = express();
const request = require('request');

app.use(express.static(__dirname + '/static'));

app.set("view engine", "ejs");

app.set('views', path.join(__dirname, 'views'));

app.get("/", function (req, res) {
    res.render("search");
});

app.get("/results", function (req, res) {
    //res.send("hello world!");
    var query = req.query.Search;
    var url = "http://www.omdbapi.com/?t=" + query + "&apikey=cd7554dc";

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", { data: data });
        }
    });
});

app.listen(3000, function () {
    console.log("Movie App Has Started !!!");
});