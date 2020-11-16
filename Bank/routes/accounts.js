const Loan = require('../Model/Loan.js');
const Account = require('../model/Account.js');
const axios = require('axios');

//app.post("/withdrawl-money", (req, res) => {
exports.withdrawMoney = function(req, res){
    let userId = req.body.userId.toString();
    let amount = req.body.amount.toString();

    Account.getUserAccount(userId).then(account => {
        
        if (account.Amount - amount > 0){
            Account.updateAmount(userId, -amount);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }

    }).catch(err => {
        res.sendStatus(403);
    });
};