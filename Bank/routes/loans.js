const Loan = require('../Model/Loan.js');
const Account = require('../model/Account.js');
const axios = require('axios');

//app.get("/list-loans/:userId", (req, res) => {
exports.listUserLoans = function(req, res) {
    let userId = req.params.userId.toString();  // This is better, userId is NOT optional
    Loan.getUserLoans(userId).then(list => {
        res.send(list).status(200);
    }).catch(err => {
        res.sendStatus(404);
    });
};

//app.post("/create-loan", (req, res) => {
exports.createLoan = function(req, res){
    let bankUserId = req.body.bankUserId.toString();
    let loanAmount = req.body.loanAmount.toString();

    Account.getUserAccount(bankUserId).then(account => {
        let totalAccountAmount = account.Amount.toString();
        axios.post('http://localhost:5000/api/bank_loan/loan-calculate', {loanAmount, totalAccountAmount}).then(loanApproved => {
            Loan.createLoan(bankUserId, loanAmount);
            
            res.sendStatus(200);
        }).catch(err => {
            res.sendStatus(400);
        });
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
};

//app.post("/pay-loan", (req, res) => {
exports.payLoan = function(req, res){
    let bankUserId = req.body.bankUserId.toString();
    let loanId = req.body.loanId.toString();
    
    Account.getUserAccount(bankUserId).then(account => {
        Loan.getLoan(loanId).then(loan => {
            if (account.Amount < loan.Amount){
                res.sendStatus(403);
            } else {
                Loan.resolveLoan(loanId);
                res.sendStatus(200);
            }
        }).catch(err => {
            console.log("ERROR")
        });
    }).catch(err => {
        res.sendStatus(500);
    });
};

//app.get("/loan/:loanId", (req, res) => {
exports.getLoan = function(req, res){
    let loanId = Number(req.params.loanId);
    Loan.getLoan(loanId).then(loan => {
        res.send(loan).status(200);
    }).catch(err => {
        res.sendStatus(204);
    });
};
