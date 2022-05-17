const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Model = require('./models');
const moment = require('moment');
const tools = require('./functions');

// Connecting to database
const query = 'mongodb+srv://Piquenbauer:dbuserdbuser@cluster0.plgoy.mongodb.net/PersonalitiesDB?retryWrites=true&w=majority';

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

router.get('/name_birth_test', function(req, res) {
    const {name, birth} = req.query;
    var regName = /^[a-zA-Z]+$/;
    const curr_date = new Date();

    // Check if name and birthday is null.
    if (name === null || birth === null){
        res.statusMessage = "Please enter both name and your birthday.";
        return res.status(400).end();
    }

    // Check if birthday is in a valid format.
    if (!moment(birth, "MM/DD/YYYY", true).isValid()){
        res.statusMessage = "Please enter a valid date.";
        return res.status(400).end();
    }

    const input_date = new Date(birth);

    //Check if birthday is later than today.
    if (curr_date - input_date < 0){
        res.statusMessage = "Please enter a valid date.";
        return res.status(400).end();
    }

    //Check if name includes invalid characters. (Only letters are allowed)
    if (!regName.test(name)){
        res.statusMessage = "Please enter a valid name.";
        return res.status(400).end();
    }

    var index = tools.calculate(name, birth);

    Model.findOne({"index": index},
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