/*
 * Responsible for 
 *
 * Author: Arvid Larsen
 */

const port = 8201;
const express = require('express');

var app = express();

app.use(express.json);

app.post("/pay-tazes", (req, res) => {
    let userId = req.body.userId.toString();
    let totalAmount = req.body.amount.toString();
    // Check if user did previously pay taxes -> if value is > 0 in SkatUserYear
    // Call to TaxCalculator
    // If good response -> SkatUserYear will be updated with the returned sum and IsPaid == true
    // Call to Bank api, subtract money from account.
    // This request should  amount and UserId

    res.sendStatus(500);
});


app.listen(port, err => {
    if (err){
        console.log(err);
    } else {
        console.log("Listening on port ", port);
        console.log("Skat system is running...")
    }
});
