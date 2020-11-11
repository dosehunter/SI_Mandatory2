/**
 * Responsible for ... Not much
 * 
 * Author: Arvid Larsen
 */

const port = 8101;
const express = require('express');
const Account = require('./Account');
const User = require('./BankUser');
const Loan = require('./Loan');
const Deposit = require('./Deposit');
const axios = require('axios');

var app = express();

app.use(express.json());

app.get("/list-deposits", (req, res) => {
    /*
    GETrequest that takes a BankUserId
    Returns a list of all the deposits that were made by that user
     */
});

// http://localhost:8101/list-loans/122
//let userId = req.query.userId.toString();
app.get("/list-loans/:userId", (req, res) => {
    let userId = req.params.userId.toString();  // This is better, userId is NOT optional
    Loan.getUserLoans(userId).then(list => {
        res.send(list).status(200);
    }).catch(err => {
        res.sendStatus(404);
    });
});


app.post('/add-deposit', (req, res) =>{
    let amount = req.body.amount.toString();
    let userId = req.body.userId.toString();

    if (!amount || amount < 0){
        console.log("What the hell dude?")
        res.sendStatus(403);
    }

    // Send request to interest rate system to get amount with interest
    axios.post('http://localhost:8103/calculate-interest_rate', {"depositAmount": amount}).then(response =>{
        // Update amount in BankUser
        let newAmount = response.data.newAmount.toString();
        
        Account.updateAmount(userId, newAmount);
        //Save to Deposit
        Deposit.addDeposit(userId, amount);
        
        return res.status(200).send({"Deposited": newAmount});
    }).catch(err =>{
        if(err){
            console.log(err);
            return res.sendStatus(500);
        }
    });
});

app.post("/create-loan", (req, res) => {
    // Request will contain the BankUserIdand LoanAmount. 
    // A POST request will be made to the Loan Algorithm Function with an amount and the total account amount for that user 
    // If the status code is 200, a loan record will be created
    // If the status code is 403 or similar, an error will be returned
});

app.post("/pay-load", (req, res) => {
    /* 
    The loan can be paid integrally by using the /pay-loan endpoint. 
    The request will containthe BankUserId and the LoanId as well. 
    This will make the amount from a loan 0 and will subtract that amount from the accountof that user. 
    If there aren’t enough money on the account, an error will be returned.
    */
});

app.post("/withdrawl-money", (req, res) => {
    /*
    The body of that request should contain an amount and a UserId(Not BankUserId, not SkatUserId)
    Subtract (if possible)the amount from that users account.Throw an error otherwise.
    */
});

/*
#############################################################################
#####################    FOR TEMPORARY TESTING ONLY!    ##################### 
 */
//#region 
app.get("/test-add", (req, res) => {
    User.createUser(1233312);
    res.sendStatus(200);
});
app.get("/test-read", (req, res) => {
    User.getUser(1233312).then(value => {
        console.log(value);
    });
    res.sendStatus(200);
});
app.get("/test-remove", (req, res) => {
    User.deleteUser(1233312);
    res.sendStatus(200);
});
app.get("/test-update", (req, res) => {
    User.updateUser(1233312, 99999);
    res.sendStatus(200);
});

app.get("/test-create-acc", (req, res) => {
    Account.createAccount(99999, 0, 0.3, 100);
    res.sendStatus(200);
});

app.get("/test-get-acc", (req, res) => {
    Account.getAccount(8383905086).then(account => {
        console.log(account);
    })
    res.sendStatus(200);
});
app.get("/test-update-acc", (req, res) => {
    Account.updateAccount(8383905026, 8383905026, 99999, 0, 0.2, 200);
    res.sendStatus(200);
})

app.get("/test-get-loans", (req, res) => {
    Loan.getUserLoans(122).then(list => {
        list.forEach(element => {
            console.log(element);
        });
    });
    res.sendStatus(200);
})
//#endregion
/*
#####################    END OF TEMPORARY TESTING!    ####################### 
############################################################################# 
*/

app.listen(port, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("Listening on port " + port);
        console.log("Bank system is running...");
    }
});