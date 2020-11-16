const Deposit = require('../Model/Deposit.js');
const Account = require('../model/Account.js');
const axios = require('axios');

// http://localhost:8101/list-deposits/99999
exports.listDeposits = function(req, res){
    let bankUserId = req.params.bankUserId.toString();
    
    Deposit.getUserDeposits(bankUserId).then(list => {
        res.send(list).status(200);
    }).catch(err => {
        res.sendStatus(404);
    });
};

exports.addDeposit = function(req, res) {
    let amount = req.body.amount.toString();
    let bankUserId = req.body.bankUserId.toString();
    
    if (!amount || amount < 0){
        console.log("What the hell dude?")
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