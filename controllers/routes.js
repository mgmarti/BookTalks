const request = require('request');
const axios = require('axios');
const goodreads = {
    id: process.env.GOODREADS_KEY,
    secret: process.env.GOODREADS_SECRET
};

const path = require("path");
var authController = require('./authcontroller');



module.exports = function (app) {

    //Landing
    //=====================================================

    app.get('/', function (req, res) {
        res.redirect('signin');
    });


    app.get('/featured', function (req, res) {
        res.render('featured');
    })


    //Book Reviews Results
    //=====================================================
    app.get('/results', function (req, res) {
        // console.log(req.query.search);
        let search = req.query.search;

        axios.all([axios.get('https://www.goodreads.com/book/title.json?key=' + goodreads.id + '&title=' + search),
                axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search)
            ])

            .then(axios.spread((reviews, title) => {
                // do something with both responses
                // console.log(title.data.items[2].volumeInfo)

                res.render('results', {
                    reviewsData: reviews.data.reviews_widget,
                    titleData: title.data.items[2].volumeInfo.title,
                    coverData: title.data.items[2].volumeInfo.imageLinks.thumbnail,
                    summaryData: title.data.items[2].volumeInfo.description
                });

            }))
            .catch(function (error) {
                console.log(error);
            });
    });


    app.get('/signup', authController.signup);

}