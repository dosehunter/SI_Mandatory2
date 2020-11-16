const express = require('express');
var router = express.Router();

var deposits = require('./deposits.js');
var loans = require('./loans.js');
var accounts = require('./accounts.js');


//#region DEPOSIT ROUTES
// GET list of user deposits
router.get('/list-deposits/:bankUserId', deposits.listDeposits);

// POST request for depositing
router.post('/add-deposit', deposits.addDeposit);

//#endregion


//#region LOAN ROUTES
// GET list of users loans
router.get('/list-loans/:userId', loans.listUserLoans);

// POST for creating a loan
router.post('/create-loan', loans.createLoan);

//POST for paying off a loan
router.post('/pay-loan', loans.payLoan);

//#endregion


//#region ACCOUNT ROUTES
// POST for withdrawing money
router.post('/withdrawl-money', accounts.withdrawMoney); 

//#endregion



module.exports = router;