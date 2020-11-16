/**
 * Responsible for calculating interest rate with deposits.
 * 
 * Author: Arvid Larsen
 */

const port = 8103;
const express = require('express');

var app = express();

app.use(express.json());


app.post("/api/bank/calculate-interest_rate", (req, res) => {
    let depositAmount = Number(req.body.depositAmount.toString());

    if (depositAmount > 0 && !isNaN(depositAmount)){
        depositAmount += depositAmount * 0.02;
        res.send({"newAmount": depositAmount}).status(200);
    } else {
        res.send({"newAmount": "Bad value"}).status(400);
    } 
});



app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Listening on port " + port);
        console.log("Interest Rate system is running...");
    }
});