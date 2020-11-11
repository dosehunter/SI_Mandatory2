/**
 * Responsible for calculating loan
 * 
 * Author: Arvid Larsen
 */

const port = 8102;
const express = require('express');
const sqlite3 = require('sqlite3');

var app = express();
var db = new sqlite3.Database('../Bank/Bank.db');

app.use(express.json());


app.post("/loan-calculate", (req, res) => {
    let loanAmount = req.body.loanAmount.toString();
    let accountNo = req.body.accountNo.toString();



    
    // Get account amount
    // See if loan amount exceed account amount by 75% 
    // e.g. if loan = 300, and acc_amount = 340
    // Deny, return 403
    // Otherwise return 200
});



app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Listening on port " + port);
        console.log("Bank system is running...");
    }
});