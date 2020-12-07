/*
 * Responsible for all routes related to deposits (Bank.Deposit).
 * 
 * Author: Arvid Larsen
 */

const Deposit = require('../Model/Deposit.js');
const Account = require('../model/Account.js');
const axios = require('axios');

/**
 * Endpoint for getting all deposits related to bankUserId.
 * Endpoint: /api/list-deposits/:bankUserId | /api/bank/list-deposits/:bankUserId 
 * 
 * @param {request} req Incoming request.
 * @param {Response} res Outgoing response.
 */
exports.listDeposits = function(req, res){
    let bankUserId = req.params.bankUserId.toString();
    
    Deposit.getUserDeposits(bankUserId).then(list => {
        res.status(200).send(list);
    }).catch(err => {
        res.sendStatus(404);
    });
};

/**
 * Endpoint for making a deposit to a bankUserId.
 * Endpoint: /api/add-deposit | /api/bank/add-deposit
 * 
 * @param {request} req Incoming request.
 * @param {Response} res Outgoing response.
 */
exports.addDeposit = function(req, res) {
    let amount = req.body.amount.toString();
    let bankUserId = req.body.bankUserId.toString();
    
    if (!amount || amount < 0){
        res.sendStatus(403);
    }
    
    // Send request to interest rate system to get amount with interest
    axios.post('http://localhost:5000/api/bank_interest/calculate-interest_rate', {"depositAmount": amount}).then(response =>{
        // Update amount in BankUser
        let newAmount = response.data.newAmount.toString();
        
        Account.updateAmount(bankUserId, newAmount);

        // Should probably wait for a response?
        //Save to Deposit
        Deposit.addDeposit(bankUserId, amount);
        
        return res.status(200).send({"Deposited": newAmount});
    }).catch(err =>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
    });
};
