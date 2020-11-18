/*
 * Responsible for all routes related to accounts
 * 
 * Author: Arvid Larsen
 */

const Account = require('../model/Account.js');
const axios = require('axios');
const sqlite3 = require('sqlite3');

var db = new sqlite3.Database('../Bank/Bank.db');


//app.post("/account", (req, res) => {
exports.createAccount = function(req, res) {
    let userId = Number(req.body.userId);
    let isStudent = Number(req.body.isStudent);
    let interestRate = Number(req.body.interestRate);
    let amount = Number(req.body.amount);

    Account.createAccount(userId, isStudent, interestRate, amount);
    res.sendStatus(200);
};

//app.get("/account/:accountId", (req, res) => {
exports.getAccount = function(req, res){
    let account = Number(req.params.accountId);

    Account.getAccount(account).then(account => {
        res.send(account).status(200);
    }).catch(err => {
        res.sendStatus(500);
    })
};

//app.put("/account/:accountId", (req, res) => {
exports.updateAccount = function(req, res) {
    let accNo = Number(req.params.accountId);
    let newAccNo = Number(req.body.newAccountNo);
    let bankUserId = Number(req.body.bankUserId);
    let isStudent = Number(req.body.isStudent);
    let interestRate = Number(req.body.interestRate);
    let amount = Number (req.body.amount);

    Account.updateAccount(accNo, newAccNo, bankUserId, isStudent, interestRate, amount);
    res.sendStatus(200);
};

//app.delete("/account/:accountId", (req, res) => {})
exports.deleteAccount = function(req, res){
    let accountNo = Number(req.params.accountId);
    Account.deleteAccount(accountNo);
    res.sendStatus(200);
};

//app.post("/withdrawl-money", (req, res) => {
exports.withdrawMoney = function(req, res){
    let bankUserId = req.body.bankUserId.toString();
    let amount = req.body.amount.toString();
    
    Account.getUserAccount(bankUserId).then(account => {
        
        if (account.Amount - amount > 0){
            Account.updateAmount(bankUserId, -amount);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }

    }).catch(err => {
        res.sendStatus(403);
    });
};

exports.payTaxes = function(req, res) {
    let userId = req.body.UserId;
    let amount = req.body.Amount;
    
    let queryGetAccountFromUserId = "SELECT Account.BankUserId FROM Account INNER JOIN BankUser ON Account.BankUserId = BankUser.Id WHERE BankUser.UserId = ?;";

    db.get(queryGetAccountFromUserId, [userId], (err, bUserId) => {
        if (err || !bUserId)
            res.sendStatus(404);

        let bankUserId = bUserId.BankUserId;
        axios.post("http://localhost:5000/api/bank/withdrawl-money", {bankUserId, amount}).then(response => {
            if (response.status == 200){
                res.sendStatus(200);
            }
        }).catch(err => {
            res.send('Bank.accounts.payTaxes endpoint cannot communicate with /api/bank/withdrawl-money!').status(500);
        });

    });
}
