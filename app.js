var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
const { response } = require("express");
var port = process.env.port||5000;
var db = require("./config/database.js");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

// Allow access to the folder that contains the game files
app.use(express.static(__dirname+'/game'));

mongoose.connect(db.mongoURI,{
    useNewURLParser:true
}).then(function(){
    console.log("connected to MongoDB Database");
}).catch(function(err){
    console.log(err);
});

require('./config/highScore.js');
var highScore = mongoose.model("highScore");

// Main routes
app.get('/', function(req, res){
    res.redirect('./game/index.html');
});

app.listen(port, function(){
    console.log(`Running on port ${port}.`);
})