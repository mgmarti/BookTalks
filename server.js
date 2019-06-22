//---- REQUIRE .env ----
require("dotenv").config();
const express = require("express");
const app = express();

//Handle Authentication
//==========================================================================
const passport = require('passport');
const session = require("express-session")
//==========================================================================

const PORT = process.env.PORT || 8080;


const connection = require('./config/connection');
app.set("view engine", "ejs");


// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));


// Extracts body of incomin request and exposes in format easier to work with(JSON)
//==========================================================================
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
//==========================================================================


// Initialize Passport/passport session/express seassion and adds them as middleware
//==========================================================================
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
//==========================================================================


//Models
//==========================================================================
var models = require("./models");
//==========================================================================


//Routes
require("./controllers/routes")(app);
let authRoute = require('./controllers/auth')(app, passport);


//load passport strategies
require('./config/passport/passport')(passport, models.user);


//Sync Database
//==========================================================================
models.sequelize.sync().then(function () {
    console.log('Nice! Database looks fine')
}).catch(function (err) {
    console.log(err, "Something went wrong with the Database Update!")
});
//==========================================================================


// Start our server so that it can begin listening to client requests.
// ===================================================================

app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});