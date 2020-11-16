/*
 * Responsible for all routes related to accounts
 * 
 * Author: Arvid Larsen
 */

const Account = require('../model/Account.js');

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
