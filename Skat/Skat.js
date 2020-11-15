/*
 * Responsible for 
 *
 * Author: Arvid Larsen
 */

const port = 8201;
const express = require('express');
const SkatUserYear = require('./SkatUserYear');
const axios = require('axios');

var app = express();

app.use(express.json);

app.post("/pay-taxes", (req, res) => {
    let userId = req.body.userId.toString();
    let totalAmount = req.body.amount.toString();
    
    SkatUserYear.getSkatUserYear(userId).then(record => {
        let user = record;
        
        if (amount > 0){
            axios.post('http://localhost:8202/Skat_Tax_Calculator', {"amount": user.Amount}).then(response =>{
                let total = response.total;
                user.IsPaid = 1;
                user.Amount = total;

                console.log("UPDATING USER!");
                SkatUserYear.updateUser(user);
            }).catch(err => {
                res.sendStatus(403);
            });
        }
    }).catch(err => {
        res.sendStatus(500);
    });
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
