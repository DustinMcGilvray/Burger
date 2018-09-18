var express = require("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8080;

var app = express();

//Allows us to use static content (style sheets) from the "Public" folder.
 app.use(express.static("public"));

 //Parse Application/X-Form-URLencoded
 app.use(bodyParser.urlencoded({ extended: true}));

 //Parse Application/JSON
 app.use(bodyParser.json());

 //Set Handlebars
 var exphbs = require("express-handlebars");

 app.engine("handlebars", exphbs({ defaultLayout: "main" }));
 app.set("view engine", "handlebars");

 var routes = require("./controllers/burgers_controller.js");

 app.use(routes);

 app.listen(PORT, function() {
     console.log("Server Listening on: http://localhost:" + PORT);
 });