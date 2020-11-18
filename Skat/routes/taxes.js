/*
 * Responsible for all routes related to Skat.SkatUser
 * 
 * Author: Arvid Larsen
 */
const SkatUserYear = require('../Model/SkatUserYear.js');
const axios = require('axios');

//app.post("/pay-taxes", (req, res) => {
/**
 * Responsible for paying taxes
 * Updating Skat.db -> SkatUserYear Amount
 * Send request to Bank to deduct money from userIds account
 * Endpoint: /api/pay-taxes || /api/skat/pay-taxes 
 * 
 * @param {Request} req Incoming request, JSON: userId, amount.
 * @param {Response} res Response to client.
 */
exports.payTaxes = function(req, res){
    let userId = req.body.userId.toString();
    let totalAmount = req.body.amount.toString();
    
    SkatUserYear.getSkatUserYearUserId(userId).then(record => {
        let userSkatYear = record;
        
        if (userSkatYear.Amount == 0){
            axios.post('http://localhost:7071/api/Skat_Tax_Calculator', {"money": totalAmount}).then(response =>{
                let total = response.data.tax_money;
                userSkatYear.IsPaid = 1;
                userSkatYear.Amount = total;
                
                SkatUserYear.updateSkatUserYear(userSkatYear);
                // We should probably wait for this?

                axios.post('http://localhost:5000/api/bank/pay-userid-taxes', {"UserId": userId, "Amount":total}).then(updResponse => {
                    if (updResponse.status == 200){
                        res.sendStatus(200);
                    }
                }).catch(err => {
                    res.sendStatus(403);
                });
            }).catch(err => {
                res.sendStatus(403);
            });
        }else {
            res.send("Taxes have been paid").status(400);
        }
    }).catch(err => {
        res.sendStatus(500);
    });
};
