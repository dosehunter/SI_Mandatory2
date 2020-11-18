/*
 * Responsible for running the skat system.
 * 
 * Author: Arvid Larsen
 */

const port = 8401;
const express = require('express');
const catalogue = require('./routes/catalogue.js');

var app = express();
app.use(express.json());

app.use('/api', catalogue);



app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Listening on port " + port);
        console.log("Skat system is running...");
    }
});
