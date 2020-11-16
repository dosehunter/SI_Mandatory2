/*
 * Responsible for all routes related to Skat.SkatUser
 * 
 * Author: Arvid Larsen
 */
const SkatUserYear = require('../Model/SkatUserYear.js');
const axios = require('axios');

//app.post("/pay-taxes", (req, res) => {
exports.payTaxes = function(req, res){
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
};
