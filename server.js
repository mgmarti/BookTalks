var express = require("express");
const request = require('request');

var PORT = process.env.PORT || 8080;

var app = express();
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.set("view engine", "ejs");


//ROUTE
// ===================================================================
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


//XML GET request to goodreads api
// ===================================================================
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4){
    if (xhr.status === 200) {
      console.log(xhr.responseText);
    }
    if(xhr.status == 404){
      console.log('File not found')
    }
  }
};
xhr.open('get', 'https://www.goodreads.com/search/index.xml?key=x3HAWeRhYJyCzsHPwGWgA&q=the+hobbit', true);
xhr.send();




// Start our server so that it can begin listening to client requests.
// ===================================================================

app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});