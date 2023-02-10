var mongoose = require("mongoose");
var schema = mongoose.Schema;
var schema = new Schema({
    name:{
        type:String,
        required:true
    },
    score:{
        type:Number,
        required:true
    }
});

mongoose.model("highscore", Schema);