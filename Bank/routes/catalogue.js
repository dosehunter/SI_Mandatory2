/*
 * Responsible for defining all routes
 * 
 * 
 * Relevant:
 * https://medium.com/@xoor/building-a-node-js-rest-api-5-defining-the-routes-9eab8031b087
 * https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
 * 
 * Author: Arvid Larsen
*/
const express = require('express');
var router = express.Router();

var deposits = require('./deposits.js');
var loans = require('./loans.js');
var accounts = require('./accounts.js');
var users = require('./users');


//#region DEPOSIT ROUTES
// GET list of user deposits
router.get('/list-deposits/:bankUserId', deposits.listDeposits);

// POST request for depositing
router.post('/add-deposit', deposits.addDeposit);

//#endregion


//#region LOAN ROUTES
// GET list of users loans
router.get('/list-loans/:userId', loans.listUserLoans);

router.get('/loan/:loanId', loans.getLoan);

// POST for creating a loan
router.post('/create-loan', loans.createLoan);

//POST for paying off a loan
router.post('/pay-loan', loans.payLoan);

//#endregion


//#region ACCOUNT ROUTES
// POST for withdrawing money
router.post('/withdrawl-money', accounts.withdrawMoney); 

router.route('/account/:accountId')
    .get(accounts.getAccount)
    .delete(accounts.deleteAccount)
    .put(accounts.updateAccount);

router.post('/pay-userid-taxes', accounts.payTaxes);

router.post('/account', accounts.createAccount);

//#endregion


//#region USER ROUTES
// GET for retrieving a user
router.route('/user/:userId')
    .get(users.getUser)
    .post(users.createUser)
    .delete(users.deleteUser)
    .put(users.updateUser);


//#endregion

module.exports = router;
