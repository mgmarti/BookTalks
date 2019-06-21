//---- REQUIRE .env ----
require("dotenv").config();

var express = require("express");

var PORT = process.env.PORT || 8080;

var app = express();
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;




// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.set("view engine", "ejs");

require("./controllers/routes")(app);



// Start our server so that it can begin listening to client requests.
// ===================================================================

app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});