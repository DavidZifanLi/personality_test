
const express=require('express');
const bodyParser=require('body-parser');
const api = require('./api');

const port=3000;
const app=express();

app.listen(port, function() {
    console.log("Server is listening at port:" + port
        + "\n" + "Please enter your name, birthday, and gender, respectively."
        + "\n" + "birthday should be in format of MM/DD/YYYY, gender should be male or female.");
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({extended: true}));

// Parses the text as json
app.use(bodyParser.json());

app.use('/api', api);

