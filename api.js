
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Model = require('./models');

// Connecting to database
var query = 'mongodb+srv://Piquenbauer:dbuserdbuser@cluster0.plgoy.mongodb.net/PersonalitiesDB?retryWrites=true&w=majority'

const db = (query);
mongoose.Promise = global.Promise;

mongoose.connect(db, { useNewUrlParser : true,
    useUnifiedTopology: true }, function(error) {
    if (error) {
        console.log("Error!" + error);
    }
});

router.get('/findall', function(req, res) {
    Model.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
        }
    });
});

router.get('/findfirst', function(req, res) {
    Model.findOne({index: 2},
        function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                res.send(data);
            }
        });
});


module.exports = router;