const express = require("express");
const mysql = require("mysql"); 
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
var PORT = process.env.PORT || 3000;

//connection
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'nodelogin'
});

console.log(connection + "We are connected!");


const app = express();

app.use(express.static("public"));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.get('/', function(request, response){
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
    let username = request.body.username;
    let password = request.body.password;

    if(username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
            if(results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.redirect('/home');
                console.log('logged in!');
            }else {
                response.send('Incorrect Username and/or Password');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }

    app.get('/home', function(request, response){
        if(request.session.loggedin) {
            response.send('Welcome back, ' + request.session.username + '!');
        }else {
            response.send('Please login to view this page!');
        }
        response.end();
    });    
});

app.listen(PORT, function(){
    console.log('App listening on PORT: ' + PORT);
    });






