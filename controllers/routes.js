const request = require('request');
const axios = require('axios');
const goodreads = {
    id: process.env.GOODREADS_KEY,
    secret: process.env.GOODREADS_SECRET
};

const path = require("path");


module.exports = function (app) {

    //Landing
    app.get('/', function (req, res) {
        res.json(path.join(__dirname, 'public/index1.html'))
    });

    // app.get('/results', function (req, res) {
    //     //  console.log(req.query.search)
    //     let query = req.query.search;
    //     let url = 'https://api.nytimes.com/svc/books/v3/reviews.json?api-key=Mq5lFkaIzR9btltiM1AWfSABUqOGAeRr&author=' + query;


    //     request(url, function (error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             //To convert body to object
    //             let data = JSON.parse(body)
    //             res.render('results', {
    //                 bookData: data
    //             });
    //         }
    //     });

    // });


    //Results after search
    app.get('/featured', function (req, res) {
        res.send('Featured Page');


    });

    app.get('/results', function (req, res) {
        // console.log(req.query.search);
        // const query = req.query.search;
        axios.get(`https://www.goodreads.com/book/title.json?key=${goodreads.id}&title=the+hobbit`)
            .then(function (reviews) {
                // console.log(reviews)

                res.render('results', {reviewsData: reviews.data.reviews_widget});

                //iframe widget
                // res.send(reviews.data.reviews_widget);

            })
            .catch(function (error) {
                console.log(error);
            });


    });

   
    //app.post - new reviews, new users
    //app.delete - delete reviews
    //app.put 






}