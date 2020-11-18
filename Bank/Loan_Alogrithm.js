/**
 * Responsible for determining if a loan is okay.
 * 
 * Author: Arvid Larsen
 */

const port = 8102;
const express = require('express');

var app = express();

app.use(express.json());


app.post("/api/bank/loan-calculate", (req, res) => {
    
    let loanAmount = req.body.loanAmount.toString();
    let accountTotal = req.body.totalAccountAmount.toString();
    let percentageOfTotal = (loanAmount/accountTotal) * 100; 
    
    if (percentageOfTotal > 75)
        res.sendStatus(403);
    else
        res.sendStatus(200);
});



app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Listening on port " + port);
        console.log("Loan system is running...");
    }
});