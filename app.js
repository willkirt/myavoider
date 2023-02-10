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

require('./config/highscoreSchema.js');
var highscoreSchema = mongoose.model("highscore");

// Main route
app.get('/', function(req, res){
    res.redirect('./game/index.html');
});

// Call the setHighscore function to add the current score to the database
app.post('/setHighscore', function(req, res){
    var setHighscore = {
        Name:req.body.Name,
        Score:req.body.Score
    }
    new highscoreSchema(req.body).save().then(function(){
        console.log(setHighscore);
        lastScore = req.body.Score;
        res.redirect('/index.html');
    })
})

// Call the getHighscores function to retrieve the list of current highscores for the game
app.get('/getHighscores', function(req, res){
    highscoreSchema.find({}).sort({Score: -1}).then(function(index){
        res.json({index});
    })
})

app.listen(port, function(){
    console.log(`Running on port ${port}.`);
})