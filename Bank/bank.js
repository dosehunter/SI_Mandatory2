/*
 * Responsible for running the bank system
 * 
 * Author: Arvid Larsen
 */

const port = 8101;
const express = require('express');

const catalogue = require('./routes/catalogue.js');

var app = express();
app.use(express.json());

app.use('/api/bank', catalogue);



app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Listening on port " + port);
        console.log("Bank system is running...");
    }
});
