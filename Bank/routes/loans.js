/*
 * Responsible for all routes related to loans (Bank.Loan).
 * 
 * Author: Arvid Larsen
 */

const Loan = require('../Model/Loan.js');
const Account = require('../model/Account.js');
const axios = require('axios');

/**
 * Endpoint for listing all loans related to a userId.
 * Endpoint: /api/list-loans/:userId | /api/bank/list-loans/:userId
 * 
 * @param {request} req Incoming request, parameter with userId.
 * @param {Response} res Outgoing response.
 */
exports.listUserLoans = function(req, res) {
    let userId = req.params.userId.toString();  // This is better, userId is NOT optional
    Loan.getUserLoans(userId).then(list => {
        res.send(list).status(200);
    }).catch(err => {
        res.sendStatus(404);
    });
};

/**
 * Endpoint for creating a new loan based on bankUserId.
 * Endpoint: /api/create-loan | /api/bank/create-loan
 * 
 * @param {request} req Incoming request, JSON with bankUserId and loanAmount.
 * @param {Response} res Outgoing response.
 */
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

/**
 * Endpoint for paying a loan based on bankUserId.
 * Endpoint: /api/pay-loan | /api/bank/pay-loan
 * 
 * @param {request} req Incoming request, JSON with bankUserId and loanId.
 * @param {Response} res Outgoing response.
 */
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

/**
 * Endpoint for paying a loan based on bankUserId.
 * Endpoint: /api/loan/:loanId | /api/bank/loan/:loanId
 * 
 * @param {request} req Incoming request, parameter with loanId.
 * @param {Response} res Outgoing response.
 */
exports.getLoan = function(req, res){
    let loanId = Number(req.params.loanId);
    Loan.getLoan(loanId).then(loan => {
        res.send(loan).status(200);
    }).catch(err => {
        res.sendStatus(204);
    });
};
