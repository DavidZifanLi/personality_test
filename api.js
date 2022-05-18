const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Model_1 = require('./models/model_1');
const Model_2 = require('./models/model_2');
const Model_3 = require('./models/model_3');
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

router.get('/name_birth_test/', function(req, res) {
    const {name, birth, gender} = req.query;
    var regName = /^[a-zA-Z]+$/;
    const curr_date = new Date();

    // Check if name and birthday is null.
    if (name === null || birth === null || gender === null) {
        res.statusMessage = "Please enter both name, gender and your birthday.";
        return res.status(400).end();
    }

    // Check if gender is valid.
    if (gender !== "male" || gender !== "female") {
        res.statusMessage = "Please enter a valid gender.";
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

    const category = tools.get_category(birth);
    const index_1 = tools.calculate_per1(name);
    const index_2 = tools.calculate_per2(birth);
    const index_3 = tools.calculate_per3(name, gender);

    var file_1;
    var file_2;
    var file_3;
    var response_data;

    Model_1.findOne({"category": category, "index": index_1},
        function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                file_1 = data;
            }
        });

    Model_2.findOne({"category": category, "index": index_2},
        function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                file_2 = data;
            }
        });

    Model_3.findOne({"category": category, "index": index_3},
        function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                file_3 = data;
            }
        });

    response_data = file_1['review'] +
        '\n' +
        file_2['review'] +
        '\n' +
        file_3['review'];

    res.send(response_data);
});


module.exports = router;