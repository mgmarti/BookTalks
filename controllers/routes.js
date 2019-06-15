const request = require('request');

module.exports = function (app) {

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

}