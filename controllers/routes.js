const request = require('request');
const axios = require('axios');
const goodreads = {
    id: process.env.GOODREADS_KEY,
    secret: process.env.GOODREADS_SECRET
};
console.log(goodreads);
var parseString = require('xml2js').parseString;
const util = require('util');

const path = require("path");


module.exports = function (app) {
    app.get('/', function(req,res){
        res.json(path.join(__dirname, 'public/index1.html'))
    });

    app.get('/results', function (req, res) {
        //  console.log(req.query.search)
        let query = req.query.search;
        let url = 'https://api.nytimes.com/svc/books/v3/reviews.json?api-key=Mq5lFkaIzR9btltiM1AWfSABUqOGAeRr&author=' + query;


        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //To convert body to object
                let data = JSON.parse(body)
                res.render('results', {
                    bookData: data
                });
            }
        });

    });



    app.get('/dos', function (req, res) {
            // var url = 'https://www.goodreads.com/book/title.json?key=yJuFN5vbWFceK6JUPA&title=the+lightning+thief'
        // const title = req.query.search;

        axios.get(`https://www.goodreads.com/book/title.json?key=${goodreads.id}&title=the+lightning+thief`)
        // axios.get(url)
            .then(function (reviews) {
console.log(reviews)
                const html = `<!doctype html>
                <html>
                    <head>
                        <title>Reviews Width</title>
                    </head>
                    <body>${reviews.reviews_widget}</body>
                </html>`;
                console.log(html)
                res.send(reviews.data.reviews_widget);
                // console.log(res)

            })
            .catch(function (error) {
                console.log(error);
            });


    });






}